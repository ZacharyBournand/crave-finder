package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	f "fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"unicode"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/handlers"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterResponse struct {
	Message string `json:"message"`
}

const (
	// Client ID: jkrOVBPJM5ogNZ2Qi8Teow
	apiKey = "HUxlll0htBVSD5FPuV4fkOK7Ss8pZHpy7nv-mJ4rEsZIW2AcGi6Q8As3FAy21qvLnItAXhrrEsfqxoW_tcXq5SVEgxJUKDQdyBy7cmlVtRje6qwt6qZisTITHzUjZHYx"
)

type Dish struct {
	Name        string `json:"name"`
	Price       string `json:"price"`
	Description string `json:"description"`
}

type Location struct {
	Address1 string `json:"address1"`
	Address2 string `json:"address2"`
	City     string `json:"city"`
	State    string `json:"state"`
	ZipCode  string `json:"zip_code"`
}

type Restaurant struct {
	ID       int        `json:"id"`
	Name     string     `json:"name"`
	Location []Location `json:"location"`
	Rating   float32    `json:"rating"`
	Price    string     `json:"price"`
	Service  string     `json:"service"`
	Food     string     `json:"food"`
	Dishes   []Dish     `json:"dishes"`
}

type Rating struct {
	Rating     int    `json:"rating"`
	Restaurant string `json:"restaurant"`
	Food       string `json:"food"`
	UserId     string `json:"user_id"`
}

// Pass the key in via an environment variable to avoid accidentally commi
var store = sessions.NewCookieStore([]byte("super-secret"))

func main() {
	var err error

	// Open the database
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		f.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		f.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	f.Println("Successful connection to the user database")

	// Handle restaurant search requests
	http.HandleFunc("/restaurants/search", searchRestaurantsHandler)
	// Handle login requests
	http.HandleFunc("/loginauth", loginAuthHandler)
	// Handle logout requests
	http.HandleFunc("/logout", logoutHandler)
	// Handle account registration requests
	http.HandleFunc("/registerauth", registerAuthHandler)
	// Handle account authentication to change password
	http.HandleFunc("/passwordauth", passwordAuthHandler)
	// Handle password change requests
	http.HandleFunc("/passwordchange", newPasswordHandler)
	// Handle getting an individual user's ratings request
	http.HandleFunc("/get-user-ratings", getUserRatingsHandler)
	// Handle storing a individual user's ratings request
	http.HandleFunc("/storeRatingAuth", storeUserRating)
	// Handle page build requests
	http.HandleFunc("/get-restaurant-info", restaurantBuild)
	// Handles adding dishes to restaurant
	http.HandleFunc("/add-dish", addDishHandler)
	// Handles removing dishes to restaurant
	http.HandleFunc("/remove-dish", removeDishHandler)
	// Handles adding unseen restaurants
	http.HandleFunc("/add-restaurant", addRestaurantHandler)
	// Handle rating requests
	http.HandleFunc("/rating", ratingHandler)

	// Wrap your handler with context.ClearHandler to make sure a memory leak does not occur
	http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://localhost:4200"}),
		handlers.AllowCredentials(),
	)(http.DefaultServeMux))
}

func searchRestaurantsHandler(w http.ResponseWriter, r *http.Request) {
	// Get the search query parameters from the request URL
	queryParams := r.URL.Query()

	// Extract the search query parameters
	location := queryParams.Get("location")
	term := queryParams.Get("term")

	// Build the Yelp Fusion API search endpoint URL
	url := f.Sprintf("https://api.yelp.com/v3/businesses/search?location=%s&term=%s", location, term)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		f.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		f.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()

	var data struct {
		Businesses []struct {
			Name    string  `json:"name"`
			Rating  float32 `json:"rating"`
			Price   string  `json:"price"`
			Service string  `json:"service"`
			Food    string  `json:"food"`

			Location []struct {
				Address1 string `json:"address1"`
				Address2 string `json:"address2"`
				City     string `json:"city"`
				State    string `json:"state"`
				ZipCode  string `json:"zip_code"`
			} `json:"locations"`

			Dishes []struct {
				Name        string `json:"name"`
				Price       string `json:"price"`
				Description string `json:"description"`
			} `json:"dishes"`
		} `json:"businesses"`
	}

	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		f.Println(err)
		return
	}

	restaurants := []Restaurant{}

	for _, business := range data.Businesses {
		dishes := []Dish{}
		locations := []Location{}

		for _, dish := range business.Dishes {
			dishes = append(dishes, Dish{
				Name:        dish.Name,
				Price:       dish.Price,
				Description: dish.Description,
			})
		}

		for _, loc := range business.Location {
			locations = append(locations, Location{
				Address1: loc.Address1,
				Address2: loc.Address2,
				City:     loc.City,
				State:    loc.State,
				ZipCode:  loc.ZipCode,
			})
		}

		restaurants = append(restaurants, Restaurant{
			Name:     business.Name,
			Location: locations,
			Rating:   business.Rating,
			Price:    business.Price,
			Service:  business.Service,
			Food:     business.Food,
			Dishes:   dishes,
		})
	}

	// Set the response header
	w.Header().Set("Content-Type", "application/json")

	// Convert the restaurants variable to JSON
	responseJSON, err := json.Marshal(restaurants)
	if err != nil {
		f.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Write the response body
	w.Write(responseJSON)

	f.Println(restaurants)
}

// Create new user in database
func registerAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("registerAuthHandler is running")

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username := user.Username
	// Check username for only alphanumeric characters
	var alphanumericName = true

	// Go through the username characters
	for _, char := range username {
		// Check if the character is a letter or a number
		if !unicode.IsLetter(char) && !unicode.IsNumber(char) {
			alphanumericName = false
		}
	}

	// Check if the name is between 5 & 50 characters
	var nameLength bool

	if 5 <= len(username) && len(username) <= 50 {
		nameLength = true
	}

	// Check the password
	password := user.Password

	var passwordLowerCase, passwordUpperCase, passwordNumber, passwordSpecial, passwordLength, passwordNoSpaces bool
	passwordNoSpaces = true

	for _, char := range password {
		switch {
		case unicode.IsLower(char):
			passwordLowerCase = true
		case unicode.IsUpper(char):
			passwordUpperCase = true
		case unicode.IsNumber(char):
			passwordNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			passwordSpecial = true
		case unicode.IsSpace(int32(char)):
			passwordNoSpaces = false
		}
	}

	if 5 < len(password) && len(password) < 50 {
		passwordLength = true
	}

	f.Println("alphanumericName: ", alphanumericName, "\nnameLength: ", nameLength, "\npasswordLength: ", passwordLength, "\npasswordLowerCase: ", passwordLowerCase, "\npasswordUpperCase: ", passwordUpperCase, "\npasswordNumber: ", passwordNumber, "\npasswordSpecial: ", passwordSpecial, "\npasswordLength: ", passwordLength, "\npasswordNoSpaces: ", passwordNoSpaces)
	if !alphanumericName || !nameLength || !passwordLowerCase || !passwordUpperCase || !passwordNumber || !passwordSpecial || !passwordLength || !passwordNoSpaces {
		response := RegisterResponse{Message: "Invalid password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Check if the username already exists
	statement := "SELECT id FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)

	var id string

	err = row.Scan(&id)

	if err != sql.ErrNoRows {
		f.Println("The username already exists.")
		f.Println("Error: ", err)

		response := RegisterResponse{Message: "The username has already been taken"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Create a hash form of the password
	var hash []byte

	hash, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		f.Println("bcrypt error: ", err)

		response := RegisterResponse{Message: "An issue was encountered during the account registration"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Allow a SQL statement to be used repeatedly with a custom username and hashed password
	var insertStatement *sql.Stmt
	insertStatement, err = db.Prepare("INSERT INTO users (username, hash) VALUES (?, ?);")

	// If an error occurred, display an error message
	if err != nil {
		f.Println("Error preparing the statement: ", err)

		response := RegisterResponse{Message: "An issue was encountered during the account registration"}
		json.NewEncoder(w).Encode(response)
		return
	}
	defer insertStatement.Close()

	// Insert the new username and its password hashed into the database
	var result sql.Result
	result, err = insertStatement.Exec(username, hash)
	f.Println("Result:", result)

	// If an error occurred, let the user know
	if err != nil {
		f.Println("Error inserting a new user")

		response := RegisterResponse{Message: "An issue was encountered during the account registration"}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := RegisterResponse{Message: "Account successfully created"}
	json.NewEncoder(w).Encode(response)
}

func loginAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("loginAuthHandler is running")

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Get the form values
	username := user.Username
	password := user.Password

	// Retrieve the password from the database to compare the hash (encrypted password stored in the database) with the password entered by the user
	var id, hash string
	statement := "SELECT id, hash FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)
	err = row.Scan(&id, &hash)

	// If an error occurs scanning the hash, display the error
	if err != nil {
		f.Println("error selecting hash in db by username")

		response := RegisterResponse{Message: "Check username and password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Compare the hash with the password
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	// Display a successful message if there are no errors
	if err == nil {
		// Create a session
		session, _ := store.Get(r, "session")
		session.Values["id"] = id
		// Save before the execution
		session.Save(r, w)

		response := RegisterResponse{Message: "Logged in"}
		json.NewEncoder(w).Encode(response)
		return
	}
	f.Println("Incorrect password")

	response := RegisterResponse{Message: "Check username and password"}
	json.NewEncoder(w).Encode(response)
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("logoutHandler running")

	// Look for a cookie named 'session'
	session, _ := store.Get(r, "session")
	// Delete the value with the key 'id'
	delete(session.Values, "id")
	// Save the changes made
	session.Save(r, w)

	response := RegisterResponse{Message: "Logged out"}
	json.NewEncoder(w).Encode(response)
}

func ratingHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("ratingHandler running")

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	file, err := os.Open("menu.component.html")
	if err != nil {
		f.Println("Error storing your ratings")
		return
	}
	defer file.Close()

	doc, err := goquery.NewDocumentFromReader(file)
	if err != nil {
		f.Println("Error parsing html file", err)
		return
	}

	var dishRating, dishName string

	restaurantName := doc.Find(".restaurant-name")

	doc.Find("#menu-box-box").Each(func(i int, s *goquery.Selection) {
		dishName = s.Find(".dish-name").Text()
		dishRating = s.Find("#dish-rating").Find("ngb-rating").AttrOr("rate", "0")

	})

	var user User

	err = json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username := user.Username
	rating, err := strconv.Atoi(dishRating)

	// Retrive the id for the given username
	var id int
	statement := "SELECT id FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)
	row.Scan(&id)

	// Allow a SQL statement to be used repeatedly with a custom rating, restaurant, food, and user idd
	var insertStatement *sql.Stmt
	insertStatement, err = db.Prepare("INSERT INTO ratings (rating, Restaurant, Food, User_id) VALUES (?, ?);")

	// If an error occurred, display an error message
	if err != nil {
		f.Println("Error preparing the statement: ", err)

		response := RegisterResponse{Message: "An issue was encountered storing your rating in our database"}
		json.NewEncoder(w).Encode(response)
		return
	}
	defer insertStatement.Close()

	// insert food, rating, restaurant, and user_id
	var result sql.Result
	result, err = insertStatement.Exec(rating, restaurantName, dishName, id)
	f.Println("result", result)
}

func passwordAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("passwordAuthHandler is running")

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Get the first 2 form values
	username := user.Username
	password := user.Password

	// Retrieve the password from the database to compare the hash (encrypted password stored in the database) with the password entered by the user
	var id, hash string
	statement := "SELECT id, hash FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)
	err = row.Scan(&id, &hash)

	// If an error occurs scanning the hash, display the error
	if err != nil {
		f.Println("error selecting hash in db by username")

		response := RegisterResponse{Message: "Check username and password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Compare the hash with the password
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	// Display a successful message if there are no errors
	if err == nil {
		response := RegisterResponse{Message: "Account credentials confirmed! Please click on the button below to change your password."}
		json.NewEncoder(w).Encode(response)
		return
	}

	f.Println("Incorrect password")

	response := RegisterResponse{Message: "Check password"}
	json.NewEncoder(w).Encode(response)
}

func newPasswordHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("passwordAuthHandler is running")

	// Check if the HTTP method is POST
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Decode the JSON request body into a User struct
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)

	// If there was an error decoding the JSON, return an error response
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Extract the username and password from the User struct
	username := user.Username
	password := user.Password

	// Check the password
	var passwordLowerCase, passwordUpperCase, passwordNumber, passwordSpecial, passwordLength, passwordNoSpaces bool
	passwordNoSpaces = true

	for _, char := range password {
		switch {
		case unicode.IsLower(char):
			passwordLowerCase = true
		case unicode.IsUpper(char):
			passwordUpperCase = true
		case unicode.IsNumber(char):
			passwordNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			passwordSpecial = true
		case unicode.IsSpace(int32(char)):
			passwordNoSpaces = false
		}
	}

	if 5 < len(password) && len(password) < 50 {
		passwordLength = true
	}

	f.Println("\npasswordLength: ", passwordLength, "\npasswordLowerCase: ", passwordLowerCase, "\npasswordUpperCase: ", passwordUpperCase, "\npasswordNumber: ", passwordNumber, "\npasswordSpecial: ", passwordSpecial, "\npasswordLength: ", passwordLength, "\npasswordNoSpaces: ", passwordNoSpaces)

	// If the password doesn't meet the requirements, return an error response
	if !passwordLowerCase || !passwordUpperCase || !passwordNumber || !passwordSpecial || !passwordLength || !passwordNoSpaces {
		response := RegisterResponse{Message: "Invalid password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Create a hash form of the password
	var hash []byte

	hash, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		f.Println("bcrypt error: ", err)

		response := RegisterResponse{Message: "An issue was encountered during the account registration"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Update the user's password in the database
	statement := "UPDATE users SET hash = ? WHERE username = ?"

	result, err := db.Exec(statement, hash, username)

	if err != nil {
		f.Println("Error updating user's password: ", err)

		response := RegisterResponse{Message: "An issue was encountered while updating the password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Check if the update affected any rows in the database
	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		f.Println("User not found: ", username)

		response := RegisterResponse{Message: "User not found"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If the update was successful, return a success response
	response := RegisterResponse{Message: "Password updated successfully"}
	json.NewEncoder(w).Encode(response)
}

func storeUserRating(w http.ResponseWriter, r *http.Request) {
	// Parse request parameters
	restaurant := r.URL.Query().Get("restaurant")
	food := r.URL.Query().Get("dish")
	rating := r.URL.Query().Get("rating")
	username := r.URL.Query().Get("username")

	user_id, err := db.Query("SELECT id FROM craveFinder.users WHERE username = ?", username)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer user_id.Close()

	var id int
	if user_id.Next() {
		if err := user_id.Scan(&id); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Insert rating into database
	stmt, err := db.Prepare("INSERT INTO ratings (rating, Restaurant, Food, user_id) VALUES (?, ?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	f.Println(rating)
	f.Println(restaurant)
	f.Println(food)
	f.Println(id)
	res, err := stmt.Exec(rating, restaurant, food, id)
	if err != nil {
		f.Println("beans")
		log.Fatal(err)
	}

	// Return success response
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error getting rows affected: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message":      "Dish rating stored",
		"rowsAffected": rowsAffected,
	}

	jsonData, err := json.Marshal(response)
	if err != nil {
		log.Printf("Error marshaling response to JSON: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)

}

func getUserRatingsHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the request query parameters
	username := r.URL.Query().Get("username")

	f.Println("Username:", username)

	userID, err := db.Query("SELECT id FROM craveFinder.users WHERE username = ?", username)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer userID.Close()

	var id int
	if userID.Next() {
		if err := userID.Scan(&id); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Query the ratings table for ratings matching the user ID
	rows, err := db.Query("SELECT rating, Restaurant, Food, User_id FROM craveFinder.ratings WHERE User_id = ?", id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Create an array to hold the ratings, restaurants, and food items
	ratings := []Rating{}

	// Iterate over the rows and add each rating to the array
	for rows.Next() {
		var rating Rating

		err := rows.Scan(&rating.Rating, &rating.Restaurant, &rating.Food, &rating.UserId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		ratings = append(ratings, rating)
	}

	// Send the ratings as a JSON response to the client
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(ratings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Print the JSON content in the terminal
	jsonContent, err := json.Marshal(ratings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	f.Println(string(jsonContent))
}

func restaurantBuild(w http.ResponseWriter, r *http.Request) {
	f.Println("restaurantBuilder is running")
	restaurantName := r.URL.Query().Get("name")

	query := fmt.Sprintf("SELECT * FROM %s", restaurantName)
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Dish struct {
		ID          int
		Name        string
		Price       float32
		Description string
		Rating      int
		Category    string
	}

	var dishes []Dish

	for rows.Next() {
		var dish Dish
		if err := rows.Scan(&dish.ID, &dish.Name, &dish.Price, &dish.Description, &dish.Rating, &dish.Category); err != nil {
			fmt.Println(err)
			return
		}
		dishes = append(dishes, dish)
	}

	if err := rows.Err(); err != nil {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(dishes)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	return
}

func addDishHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("addDishHandler is running")
	restaurantName := r.URL.Query().Get("name")
	dishName := r.URL.Query().Get("dishname")
	price := r.URL.Query().Get("price")
	category := r.URL.Query().Get("category")
	description := r.URL.Query().Get("description")

	f.Println(restaurantName)

	query := fmt.Sprintf("SELECT * FROM %s", restaurantName)
	rows, err := db.Query(query)
	if err != nil {
		f.Println("Hello")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var insertStatement *sql.Stmt
	insertStatement, err = db.Prepare(fmt.Sprintf("INSERT INTO %s (DishName, DishPrice, DishDescription, DishRating, DishCategory) VALUES (?, ?, ?, ?, ?);", restaurantName))
	if err != nil {
		f.Println("Hey")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer insertStatement.Close()
	var result sql.Result
	result, err = insertStatement.Exec(dishName, price, description, 0, category)
	f.Println("Result:", result)
	if err != nil {
		f.Println("How's it going")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func removeDishHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("removeDishHandler is running")
	restaurantName := r.URL.Query().Get("name")
	dishName := r.URL.Query().Get("dishname")

	query := fmt.Sprintf("SELECT * FROM %s", restaurantName)
	rows, err := db.Query(query)
	if err != nil {
		f.Println("hello :()")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Dish struct {
		ID          int
		Name        string
		Price       float32
		Description string
		Rating      int
		Category    string
	}

	var deleteStatement *sql.Stmt
	deleteStatement, err = db.Prepare(fmt.Sprintf("DELETE FROM %s WHERE DishName = ?", restaurantName))
	if err != nil {
		f.Println("hello :)")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer deleteStatement.Close()
	
	var result sql.Result
	result, err = deleteStatement.Exec(dishName)
	f.Println("Result:", result)
	if err != nil {
		f.Println("How's it going")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func addRestaurantHandler(w http.ResponseWriter, r *http.Request)
{
	f.Println("addRestaurantHandler is running")
	restaurantName := r.URL.Query().Get("name")

	query := fmt.Sprintf("SELECT * FROM %s", restaurantName)
	rows, err := db.Query(query)
	if err != nil {
		createStatement, err = db.Prepare(fmt.Sprintf("CREATE TABLE %s (DishID int, DishName varchar(45), DishPrice float, DishDescription varchar(150), DishRating float, DishCategory varchar(45));", restaurantName))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var result sql.Result
		result, err = createStatement.Exec()
		f.Println("Result:", result)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		f.Println("Restaurant created.")
		return
	}


}