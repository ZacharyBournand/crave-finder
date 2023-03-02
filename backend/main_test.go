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

	reqBody := []byte(`{"username": "testUser141", "password": "testPass63!"}`)
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
