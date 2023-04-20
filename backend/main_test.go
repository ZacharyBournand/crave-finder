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

	reqBody := []byte(`{"username": "testUser148", "password": "testPass70!"}`)
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

	// Create a response recorder to record the response
	rr := httptest.NewRecorder()

	// Call the handler function with the new request and response recorder
	handler := http.HandlerFunc(searchRestaurantsHandler)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the content type of the response
	expectedContentType := "application/json"
	if contentType := rr.Header().Get("Content-Type"); contentType != expectedContentType {
		t.Errorf("handler returned wrong content type: got %v want %v",
			contentType, expectedContentType)
	}

	// Check the response body
	expectedBody := `[{"id":0,"name":"Joe's Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Pizza Johny's","location":[],"rating":4.5,"price":"$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzaiola","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Miami Slice","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Mister O1 Extraordinary Pizza - Brickell","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"CRUST","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Vice City Pizza - West Kendall","location":[],"rating":5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Cèrto ","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Pummarola Coral Gables","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Magic City Pizza","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizza Deli \u0026 Company","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Amor di Pasta - Blue Lagoon","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al Forno Neapolitan Wood Fired Pizza","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"The Big Cheese Of Miami","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"New York Roma Pizza","location":[],"rating":3.5,"price":"$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzillo","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Mienzza Pizza \u0026 Grill","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"LOCAL PIE","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al’s New York Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Anthony's Coal Fired Pizza \u0026 Wings","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]}]`

	if body := rr.Body.String(); body != expectedBody {
		t.Errorf("handler returned unexpected body: got %v \n\n want %v", body, expectedBody)
	}
}

func TestStoringRatings(t *testing.T) {
	// Create a mock HTTP request with query parameters
	req := httptest.NewRequest("POST", "/storeRatingAuth?restaurant=test_restaurant&dish=test_dish&rating=5&user_id=test_user", nil)

	// Create a mock HTTP response writer
	w := httptest.NewRecorder()

	// Call the storeRatingAuth function with the mock request and response
	storeUserRating(w, req)

	// Check that the response status code is 200
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code 200, but got %d", w.Code)
	}

	// Check that the response body contains the expected message
	expected := "Dish rating stored: 1"
	if w.Body.String() != expected {
		t.Errorf("Expected response body '%s', but got '%s'", expected, w.Body.String())
	}

func TestRatingHandler(t *testing.T) {
	// create a mock http.ResponseWriter
	w := httptest.NewRecorder()
	// create a mock http.Request with a POST method and a request body
	jsonStr := []byte(`{"username": "john_doe"}`)
	req, err := http.NewRequest("POST", "/rating handler", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	// call the ratingHandler function
	ratingHandler(w, req)
	// check the response status code
	if status := w.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	// check that the result was written to the response
	expected := "result"
	if !strings.Contains(w.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			w.Body.String(), expected)
	}
}
