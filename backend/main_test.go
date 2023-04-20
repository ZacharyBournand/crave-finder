package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

func TestRegisterAuthHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	if err != nil {
		fmt.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	reqBody := []byte(`{"username": "testUser146", "password": "testPass68!"}`)
	req, err := http.NewRequest("POST", "/registerauth", bytes.NewBuffer(reqBody))
	if err != nil {
		t.Fatal(err)
	}

	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Create a mock HTTP response
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(registerAuthHandler)

	// Call the handler function
	handler.ServeHTTP(rec, req)

	// Check the response status
	if status := rec.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the response body
	var respBody struct {
		Message string `json:"message"`
	}
	err = json.Unmarshal(rec.Body.Bytes(), &respBody)
	if err != nil {
		t.Errorf("failed to unmarshal response body: %v", err)
	}
	if respBody.Message != "Account successfully created" {
		t.Errorf("handler returned unexpected body: got %v want %v", respBody.Message, "Account successfully created")
	}
}

func TestLoginAuthHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		fmt.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	// Create a mock HTTP request
	reqBody := []byte(`{"username":"helloFriend67","password":"testNow55!"}`)

	req, err := http.NewRequest("POST", "/loginauth", bytes.NewBuffer(reqBody))

	fmt.Println("Successful connection to the database")

	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Create a mock HTTP response
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(loginAuthHandler)

	// Call the handler function
	handler.ServeHTTP(rec, req)

	// Check the response status
	if status := rec.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the response body
	expected := `"message":"Logged in"`
	if !strings.Contains(rec.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v", rec.Body.String(), expected)
	}
}

func TestLogoutHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/logout", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()

	logoutHandler(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var response RegisterResponse
	if err := json.NewDecoder(rr.Body).Decode(&response); err != nil {
		t.Errorf("error decoding response body: %v", err)
	}

	expectedMessage := "Logged out"
	if response.Message != expectedMessage {
		t.Errorf("handler returned unexpected message: got %v want %v",
			response.Message, expectedMessage)
	}
}

func TestSearchRestaurantsHandler(t *testing.T) {
	// Create a new request with the desired query parameters
	req, err := http.NewRequest("GET", "/search?location=Miami&term=pizza", nil)
	if err != nil {
		t.Fatal(err)
	}

	print("1")

	// Create a response recorder to record the response
	rr := httptest.NewRecorder()

	print("2")

	// Call the handler function with the new request and response recorder
	handler := http.HandlerFunc(searchRestaurantsHandler)
	handler.ServeHTTP(rr, req)

	print("3")

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	print("4")

	// Check the content type of the response
	expectedContentType := "application/json"
	if contentType := rr.Header().Get("Content-Type"); contentType != expectedContentType {
		t.Errorf("handler returned wrong content type: got %v want %v",
			contentType, expectedContentType)
	}

	print("5")

	// Check the response body
	expectedBody := `[{"id":0,"name":"Pizza Johny's","location":[],"rating":4.5,"price":"$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzaiola","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Joe's Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Pummarola Coral Gables","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Mister O1 Extraordinary Pizza - Brickell","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Vice City Pizza - West Kendall","location":[],"rating":5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Miami Slice","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"CRUST","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Cèrto ","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al Forno Neapolitan Wood Fired Pizza","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Magic City Pizza","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Amor di Pasta - Blue Lagoon","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al’s New York Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Mister O1 Extraordinary Pizza - Coconut Grove","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Marakas Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Apizza Brooklyn Resto + Vino","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzillo","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Anthony's Coal Fired Pizza \u0026 Wings","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"La Pizza","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Piacere Wood Fired Pizza","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]}]`

	print("6")

	if body := rr.Body.String(); body != expectedBody {
		t.Errorf("handler returned unexpected body: got %v \n\n want %v", body, expectedBody)
	}
}

func TestPasswordAuthHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		fmt.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	// Set up a test HTTP server and client
	server := httptest.NewServer(http.HandlerFunc(passwordAuthHandler))
	defer server.Close()

	fmt.Println("\n\n1")

	client := &http.Client{}

	fmt.Println("\n\n2")

	// Create a test user and encode it to JSON
	user := User{Username: "helloFriend67", Password: "testNow50!"}

	fmt.Println("\n\n3")

	body, err := json.Marshal(user)

	fmt.Println("\n\n4")

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println("\n\n5")

	// Create a test request with the encoded JSON user in the body
	req, err := http.NewRequest("POST", server.URL, bytes.NewReader(body))

	fmt.Println("\n\n6")

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println("\n\n7")

	// Send the request with the client and check the response
	resp, err := client.Do(req)

	fmt.Println("\n\n8")

	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	fmt.Println("\n\n8")

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}

	fmt.Println("\n\n9")

	var response RegisterResponse
	err = json.NewDecoder(resp.Body).Decode(&response)

	fmt.Println("\n\n10")

	if err != nil {
		t.Fatal(err)
	}

	fmt.Println("\n\n11")

	expectedMessage := "Account credentials confirmed! Please click on the button below to change your password."

	fmt.Println("\n\n12")

	if response.Message != expectedMessage {
		t.Errorf("Expected message '%s', but got '%s'", expectedMessage, response.Message)
	}

	fmt.Println("\n\n13")
}

func TestNewPasswordHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		fmt.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	// Set up the request body
	user := User{
		Username: "helloFriend67",
		Password: "testNow50!",
	}
	reqBody, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Error encoding request body: %v", err)
	}

	// Create a new HTTP POST request with the request body
	req, err := http.NewRequest("POST", "/new-password", bytes.NewBuffer(reqBody))
	if err != nil {
		t.Fatalf("Error creating HTTP request: %v", err)
	}

	// Create a new HTTP response recorder to capture the response
	rr := httptest.NewRecorder()

	// Call the function being tested
	newPasswordHandler(rr, req)

	// Check the HTTP status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	// Check the response body
	var response RegisterResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Fatalf("Error decoding response body: %v", err)
	}
	if response.Message != "Password updated successfully" {
		t.Errorf("Handler returned unexpected message: got %v, want %v", response.Message, "Password updated successfully")
	}
}

func TestGetUserRatingsHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		fmt.Println("error validating sql.Open arguments")
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("error verifying connection with db.Ping")
		panic(err.Error())
	}

	// Create a new HTTP request
	req, err := http.NewRequest("GET", "/get-user-ratings?username=helloFriend67", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new HTTP response recorder
	rr := httptest.NewRecorder()

	// Create a test server that responds to the request with the getUserRatingsHandler() function
	handler := http.HandlerFunc(getUserRatingsHandler)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the content type of the response
	expectedContentType := "application/json"
	if contentType := rr.Header().Get("Content-Type"); contentType != expectedContentType {
		t.Errorf("handler returned wrong content type: got %v want %v", contentType, expectedContentType)
	}

	// Check the response body
	expectedResponseBody := `[{"rating":4,"restaurant":"Bowle","food":"Lemon Chicken Bowl","user_id":"1"},{"rating":5,"restaurant":"Blaze Pizza","food":"Cheese Pizza","user_id":"1"},{"rating":4,"restaurant":"CraveEats","food":"Crab Rangoons","user_id":"1"}]`

	if responseBody := strings.TrimSpace(rr.Body.String()); responseBody != expectedResponseBody {
		t.Errorf("handler returned wrong response body: got %v want %v", responseBody, expectedResponseBody)
	}
}
