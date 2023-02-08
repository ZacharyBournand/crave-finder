// This is a Go file
package main

import (
	"database/sql"
	f "fmt"
	/*"html/template"
	"net/http"
	"unicode"

	"golang.org/x/crypto/bcrypt"*/

	_ "github.com/go-sql-driver/mysql"
)

/*var tpl *template.Template*/
var db *sql.DB

func main() {
	/*tpl, _ = template.ParseGlob("template/*html")*/
	var err error
	db, err = sql.Open("mysql", "root:Exploring here 55!@tcp(127.0.0.1:3306)/public")

	if err != nil {
		f.Println("Error")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()

	if err != nil {
		f.Println("error verifying connection")
		panic(err.Error())
	}

	f.Println("Successful connection")

	/*http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/registerauth", registerAuthHandler)
	http.ListenAndServe("localhost:8080", nil)*/
}

// Serve the form for registering new users
/*func registerHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("registerHandler is running")
	tpl.ExecuteTemplate(w, "register.html", nil)
}*/

// Create new user in database
/*func registerAuthHandler(w http.ResponseWriter, r *http.Request) {
	f.Println("registerAuthHandler is running")*/
	// Parse the form
	/*r.ParseForm()
	username := r.FormValue("username")*/

	// Check username for only alphanumeric characters
	//var alphanumericName = true

	// Go through the username characters
	//for _, char := range username {
		// Check if the character is a letter or a number
		/*if unicode.isLetter(char) == false && unicode.IsNumber(char) == false {
			alphanumericName = false
		}
	}*/

	// Check if the name is between 5 & 50 characters
	/*var nameLength bool

	if 5 <= len(username) && len(username) <= 50 {
		nameLength = true
	}
}*/