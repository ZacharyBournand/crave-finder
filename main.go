// This is a Go file
package main

import (
	"database/sql"
	f "fmt"
	"html/template"
	"net/http"
	"unicode"

	"github.com/gorilla/context"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"

	_ "github.com/go-sql-driver/mysql"
)

var tpl *template.Template
var db *sql.DB

// Pass the key in via an environment variable to avoid accidentally commi
var store = sessions.NewCookieStore([]byte("super-secret"))

func main() {
	tpl, _ = template.ParseGlob("templates/*.html")
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
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/loginauth", loginAuthHandler)
	http.HandleFunc("/logout", logoutHandler)
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/registerauth", registerAuthHandler)
	// The 'Authentication' middleware runs before the handler function
	http.HandleFunc("/about", Authentication(aboutHandler))
	http.HandleFunc("/", Authentication(homeHandler))
	http.ListenAndServe("localhost:8080", nil)
	// Wrap your handler with context.ClearHandler to make sure a memory leak does not occur
	http.ListenAndServe("localhost:8080", context.ClearHandler(http.DefaultServeMux))
}

// Middleware that authenticates the
// The HandlerFunc parameter is the handler function that will run after this middleware
func Authentication(HandlerFunc http.HandlerFunc) http.HandlerFunc {
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
}

// Serve the form for registering new users
func registerHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("registerHandler is running")
	tpl.ExecuteTemplate(w, "index.html", nil)
}

// Create new user in database
func registerAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("registerAuthHandler is running")
	// Parse the form
	r.ParseForm()
	username := r.FormValue("username")

	// Check username for only alphanumeric characters
	var alphanumericName = true

	// Go through the username characters
	for _, char := range username {
		// Check if the character is a letter or a number
		if unicode.IsLetter(char) == false && unicode.IsNumber(char) == false {
			alphanumericName = false
		}
	}

	// Check if the name is between 5 & 50 characters
	var nameLength bool

	if 5 <= len(username) && len(username) <= 50 {
		nameLength = true
	}

	// Check the password
	password := r.FormValue("password")

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
		tpl.ExecuteTemplate(w, "index.html", "Invalid password")
		return
	}

	// Check if the username already exists
	statement := "SELECT id FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)

	var id string

	err := row.Scan(&id)

	if err != sql.ErrNoRows {
		f.Println("The username already exists.")
		f.Println("Error: ", err)

		tpl.ExecuteTemplate(w, "index.html", "The username has already been taken")
		return
	}

	// Create a hash form of the password
	var hash []byte

	hash, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		f.Println("bcrypt error: ", err)
		tpl.ExecuteTemplate(w, "index.html", "An issue was encountered during the account registration")
		return
	}

	// Display the hash string in the console
	f.Println("string(hash):", string(hash))

	// Allow a SQL statement to be used repeatedly with a custom username and hashed password
	var insertStatement *sql.Stmt
	insertStatement, err = db.Prepare("INSERT INTO users (username, hash) VALUES (?, ?);")

	// If an error occurred, display an error message
	if err != nil {
		f.Println("Error preparing the statement: ", err)
		tpl.ExecuteTemplate(w, "index.html", "An issue was encountered during the account registration")
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
		tpl.ExecuteTemplate(w, "index.html", "An issue was encountered during the account registration")
		return
	}
	// If no error occurred, display a successful message
	f.Fprint(w, "Account successfully created")
}

// Serve the form for users to log in
func loginHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("loginHandler is running")
	tpl.ExecuteTemplate(w, "login.html", nil)
}

func loginAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("loginAuthHandler is running")
	// Parse the form
	r.ParseForm()
	// Get the form values
	username := r.FormValue("username")
	password := r.FormValue("password")

	// Retrieve the password from the database to compare the hash (encrypted password stored in the database) with the password entered by the user
	var id, hash string
	statement := "SELECT id, hash FROM users WHERE username = ?"
	row := db.QueryRow(statement, username)
	err := row.Scan(&id, &hash)

	// If an error occurs scanning the hash, display the error
	if err != nil {
		f.Println("error selecting hash in db by username")
		tpl.ExecuteTemplate(w, "login.html", "Check username and password")
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
		// Execute the template
		tpl.ExecuteTemplate(w, "home.html", "Logged in")
		return
	}
	f.Println("Incorrect password")
	tpl.ExecuteTemplate(w, "login.html", "Check username and password")
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("logoutHandler running")
	// Look for a cookie named 'session'
	session, _ := store.Get(r, "session")
	// Delete the value with the key 'id'
	delete(session.Values, "id")
	// Save the changes made
	session.Save(r, w)
	// Execute the template 'logout.html'
	tpl.ExecuteTemplate(w, "login.html", "Logged out")
}

// Check if the user is logged in
// Otherwise, send them back to the login page
func homeHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("homeHandler running")
	// Execute the template 'home.html'
	tpl.ExecuteTemplate(w, "home.html", "Logged in")
}

// Also check if the user is logged in, just for the page "about.html"
func aboutHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("aboutHandler running")
	// Execute the template 'about.html'
	tpl.ExecuteTemplate(w, "about.html", "Logged in")
}
