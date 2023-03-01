package main

import (
	"bytes"
	f "fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRegisterHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/register", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	f.Println("AAA")
	handler := http.HandlerFunc(registerHandler)
	f.Println("BBB")

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	f.Println("CCC")

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	f.Println("DDD")

	expected := "text/html; charset=utf-8"
	if contentType := rr.Header().Get("Content-Type"); contentType != expected {
		t.Errorf("registerHandler returned wrong content type: got %v want %v",
			contentType, expected)
	}

	f.Println("EEE")

	// Check if the template was rendered
	expectedTemplate := "index.html"
	if rr.Body.String() == "" || !bytes.Contains(rr.Body.Bytes(), []byte(expectedTemplate)) {
		t.Errorf("registerHandler did not render the expected template: %v",
			expectedTemplate)
	}

	f.Println("FFF")
}

func TestRegisterAuthHandler(t *testing.T) {
	payload := []byte("username=user1&password=P@ssw0rd")

	req, err := http.NewRequest("POST", "/registerauth", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(registerAuthHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("registerAuthHandler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	expected := "text/html; charset=utf-8"
	if contentType := rr.Header().Get("Content-Type"); contentType != expected {
		t.Errorf("registerAuthHandler returned wrong content type: got %v want %v", contentType, expected)
	}

	// Check if the template was rendered
	expectedTemplate := "index.html"
	if rr.Body.String() == "" || !bytes.Contains(rr.Body.Bytes(), []byte(expectedTemplate)) {
		t.Errorf("registerAuthHandler did not render the expected template: %v", expectedTemplate)
	}
}
