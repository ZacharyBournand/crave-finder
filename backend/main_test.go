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

	reqBody := []byte(`{"username": "testUser41", "password": "testPass73!"}`)
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
	reqBody := []byte(`{"username":"helloFriend67","password":"testNow49!"}`)

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
	expectedBody := `[{"id":0,"name":"Pizza Johny's","location":[],"rating":4.5,"price":"$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzaiola","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Joe's Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Pummarola Coral Gables","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Mister O1 Extraordinary Pizza - Brickell","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Vice City Pizza - West Kendall","location":[],"rating":5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Miami Slice","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"CRUST","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Cèrto ","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al Forno Neapolitan Wood Fired Pizza","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Magic City Pizza","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Amor di Pasta - Blue Lagoon","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Al's New York Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Mister O1 Extraordinary Pizza - Coconut Grove","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Marakas Pizza","location":[],"rating":4.5,"price":"","service":"","food":"","dishes":[]},{"id":0,"name":"Apizza Brooklyn Resto + Vino","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Pizzillo","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Anthony's Coal Fired Pizza \u0026 Wings","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"La Pizza","location":[],"rating":4,"price":"$$","service":"","food":"","dishes":[]},{"id":0,"name":"Piacere Wood Fired Pizza","location":[],"rating":4.5,"price":"$$","service":"","food":"","dishes":[]}]`

	print("6")

	if body := rr.Body.String(); body == expectedBody {
		t.Errorf("handler returned unexpected body: got %v \n\n want %v", body, expectedBody)
	}
}

func TestStoringRatings(t *testing.T) {
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

}

func TestAddDishHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		t.Fatal("error validating sql.Open arguments:", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		t.Fatal("error verifying connection with db.Ping:", err)
	}

	// Setup mock request with query parameters
	req, err := http.NewRequest("GET", "/add-dish?name=Lokal&category=testiCategory&dishname=testiDish&price=10.3&description=testiDescription", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Setup mock response recorder
	rr := httptest.NewRecorder()

	// Call the handler function
	handler := http.HandlerFunc(addDishHandler)
	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Verify data was inserted into table
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM craveFinder.Lokal WHERE DishName = 'testiDish' AND ROUND(DishPrice, 1) = 10.3 AND DishDescription = 'testiDescription' AND DishRating = 0 AND DishCategory = 'testiCategory';").Scan(&count)
	if err != nil {
		t.Fatal(err)
	}
	if count == 0 {
		t.Errorf("handler failed to insert data into table: got %v rows inserted, want 1 row inserted", count)
	}
}

func TestRemoveDishHandler(t *testing.T) {
	var err error
	db, err = sql.Open("mysql", "bunny:forestLeaf35!@tcp(141.148.45.99:3306)/craveFinder")

	if err != nil {
		t.Fatal("error validating sql.Open arguments:", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		t.Fatal("error verifying connection with db.Ping:", err)
	}

	// Add a dish to the database for testing purposes
	_, err = db.Exec("INSERT INTO craveFinder.Lokal (DishName, DishPrice, DishDescription, DishRating, DishCategory) VALUES ('testingDish', 10.1, 'testingDescription', 0, 'testingCategory')")
	if err != nil {
		t.Fatal("error inserting test data into the database:", err)
	}

	// Prepare a mock request to remove the test dish from the database
	req, err := http.NewRequest("GET", "/remove-dish?name=Lokal&dishname=testingDish", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a mock response writer
	rr := httptest.NewRecorder()

	// Call the function with the mock request and response writer
	handler := http.HandlerFunc(removeDishHandler)
	handler.ServeHTTP(rr, req)

	// Check that the response status code is 200 (OK)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check that the test dish was successfully removed from the database
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM craveFinder.Lokal WHERE DishName = 'testingDish'").Scan(&count)
	if err != nil {
		t.Fatal("error querying the database:", err)
	}
	if count != 0 {
		t.Errorf("handler did not remove the test dish from the database: got %v want %v", count, 0)
	}
}
