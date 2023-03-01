// This is a Go file
package main

import (
	"database/sql"
	"encoding/json"
	f "fmt"
	"net/http"
	"unicode"

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

// Pass the key in via an environment variable to avoid accidentally commi
var store = sessions.NewCookieStore([]byte("super-secret"))

func main() {
	//tpl, _ = template.ParseGlob("../frontend/crave-finder/src/app/register/*.component.html")
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

	f.Println("Successful connection to the database")

	// Call a given function to handle a request to the server
	http.HandleFunc("/loginauth", loginAuthHandler)
	http.HandleFunc("/logout", logoutHandler)
	http.HandleFunc("/registerauth", registerAuthHandler)
	// The 'Authentication' middleware runs before the handler function
	//http.HandleFunc("/about", Authentication(aboutHandler))

	// Wrap your handler with context.ClearHandler to make sure a memory leak does not occur
	http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://localhost:4200"}),
		handlers.AllowCredentials(),
	)(http.DefaultServeMux))
}

// Middleware that authenticates the user
// The HandlerFunc parameter is the handler function that will run after this middleware
/*func Authentication(HandlerFunc http.HandlerFunc) http.HandlerFunc {
	// Return a type http.HandlerFunc
	return func(w http.ResponseWriter, r *http.Request) {
		// Return a session
		session, _ := store.Get(r, "session")
		// If it looks for a key that does not exist, it returns false
		// Otherwise, it returns true
		_, ok := session.Values["id"]
		f.Println("ok:", ok)

		// If it returns false, redirect the user to the login page
		if !ok {
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}
		// 'ServeHTTP' handles the HTTP request and writes out the HTTP response
		HandlerFunc.ServeHTTP(w, r)
	}
}*/

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

// Also check if the user is logged in, just for the page "about.html"
/*func aboutHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("aboutHandler running")

	response := RegisterResponse{Message: "Logged in"}
	json.NewEncoder(w).Encode(response)
}*/
