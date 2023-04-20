**WORK DONE**

Front End:
- Only display the "Account" button when the user is loggged in by checking when the user is logged in or not in the reviews-page component.
- Made reviewing dishes on menus accessible to users.
- Users can now add new restaurants, and add and remove dishes from restaurant menus.
- Overhauled CSS to be more consistent overall.
- Linked search results to restaurant menu pages.

Back End:
- Enabled the user to change their password by creating a Golang function that verifies their initial account's identity. Then another function makes sure their new password meets the requirements.
- Enabled the user to see an individual user's ratings by creating a Golang function that retrieves a user's ratings and sends it to the front-end, so its ratings can be displayed.
- Enable user to store their own ratings in a ratings by creating a golang function that stores the current user's ratings and sends it to a MySQL database.




**TESTING**

Front End:
 - Jasmine Tests:
    - Test for each of 14 components to test creation (no errors loading).
    - Test for app component to verify correct title
    
 - Cypress Tests:
    - Tests mounting for home-page, login-page, reviews-page, search-result, and user-registration components.
    - Tests that login-page component can take two-field text inputs.
    - Tests that reviews-page component can take single field text inputs.
    - Tests that search-result component can take two-field text inputs.
    - Tests that user-registration component can take two-field text inputs.




Back End:

- Registration Test: Created a mock test that runs the user registration functionality to see if the function can run correctly. 

- Login Test: Created a mock test that runs the login functionality to see if the function can run correctly. 

- Logout Test: Created a mock test that runs the logout functionality to see if the function can run correctly.

- Search Test: Created a mock test that runs the search functionality to see if the function can run correctly.

- Rating Test: Created a mock test that runs the rating functionality to see if the function can run correctly.

- Password Test: Created a mock test that runs the account verification functionality to see if the function can run correctly.

- Store Ratings Test: Created a mock test that runs rating storage functionality to see if the function can run correctly.

- Get Ratings Test: Created a mock test that runs the rating retrival functionality to see if the function can run correctly.

- New Password Test: Created a mock test that runs the new password verification functionality to see if the function can run correctly.

- User Ratings Test: Created a mock test that runs the access to individual user ratings functionality to see if the function can run correctly.


Demo Video: 




**GOLANG API DOCUMENTATION**

Our Golang API handles user registration, login, and logout that communicates with a MySQL database we created that contains a table named "users" to store user information. It also handles restaurant/food items searches by communicating with the Yelp Fusion API to give the requested information to the front-end. Another functionality it can perform is to handle user ratings by storing them in the MySQL database. It can also handle a user's password change by modifying the hashed password in the MySQL database. And it can retrieve an individual user's ratings from the MySQL table "ratings" to send that information to the front-end.

Dependencies
- database/sql
- encoding/json
- fmt
- net/http
- strings
- unicode
- golang.org/x/crypto/bcrypt
- PuerkitoBio/goquery
- github.com/gorilla/handlers
- github.com/gorilla/sessions
- github.com/go-sql-driver/mysql


Variables
- db: It holds the connection to the MySQL database.
- store: It holds and handles a session created using gorilla/sessions.


Consts
- apiKey: It holds the key that is used to athenticate and identify the client when interacting with the Yelp Fusion API.


Structs
- User: It contains the username and password of a user that are JSON-encoded and stored as strings.
- RegisterResponse: It contains a JSON-encoded message field that stores a success message or an error message depending on the outcome of the task.
- Dish: It contains the name, price, and decsription of a food item stored in the Yelp Fusion API.
- Location: It contains a restaurant's 1st & 2nd addresses, city, state, and ZIP code.
- Restaurant: It contains the ID, name, location, rating, price, service, food category, and dishes offered.
- Rating: It contains the user's rating, restaurant name, food item, and user ID offered.


Functions
- main(): It starts the server and sets up the routes for the API.

- registerAuthHandler(): It handles a new user registration by accepting a POST request with a User object; it then checks if the user already exists in the database. If the user does not exist, it creates a new account with a hashed password and stores it in the database. Otherwise, it outputs an error message.

- loginAuthHandler(): It handles authentication for existing users by accepting a POST request with a User object; it then checks if the given username and password match an account in the database.

- logoutHandler(): It ends the current user session by logging the user out.

- searchRestaurantsHandler(): It handles restaurant and food item searches by acception a POST request with 2 variable: 'location' and 'searchTerm'. It then retrieves information related to the user's inputs from the Yelp Fusion API and sends it back to the front-end.

- ratingHandler(): It is supposed to store a user's rating of a food item by accepting a POST request with a JSON payload containing information about the user who is submitting the rating. It then retrieves the user's ID from the MySQL "users" table and inserts the rating into another MySQL table called "ratings".

- passwordAuthHandler(): It handles user information verification for an existing account by accepting a POST request with a User object; it then checks if the given username and password match an account in the database. If so, it sends the user a valid response message, giving them the possibility to change their password.

- newPasswordHandler(): It handles new password requirements verification for an existing account by accepting a POST request with a User object; it then checks if the given password matches the requirements for a password to be valid. If so, it sends the user a valid response message letting them know that their password has been updated successfully.

- getUserRatingsHandler(): It handles individual user ratings' searches by accepting a POST request with the username. It then retrieves information from the MySQL "ratings" table that contains the ratings given by this user, and it sends it back to the front-end.


Endpoints
- POST /registerauth: It handles user registration by receiving a User object (JSON-encoded) in the request body and responding with a RegisterResponse object (JSON-encoded) containing a success or error message depending on the task's outcome.

- POST /loginauth: It handles user login by receiving a User object (JSON-encoded) in the request body and responding with a session cookie if the user is successfully authenticated.

- POST /logout: It handles user logout by getting a valid session cookie in the request; it then ends the current user session.

- GET /restaurants/search: It handles search requests by extracting the search query parameters (location, term) from the request URL. It then sends a GET request to the Yelp API and decodes the JSON response into a struct. Then, it converts the struct into JSON format and writes the response to the HTTP response writer.

- POST /rating: It handles the storage of users' ratings for a particular dish in a database. It parses an HTML file called "menu.component.html" and extract the name of the restaurant, the name of the dish that the user is rating, and the rating value selected by the user. Next, the function decodes the JSON data in the request body into a User struct. Then, it inserts the rating information into the database.

- POST /passwordauth: It handles account verification by receiving a User object (JSON-encoded) in the request body and responding with a RegisterResponse object (JSON-encoded) containing a success message if the account information given by the user is valid or an error message if it is instead invalid.

- POST /passwordchange: It handles password requirement verification by receiving a User object (JSON-encoded) in the request body and responding with a RegisterResponse object (JSON-encoded) containing a success message if the new password given by the user is valid or an error message if it is instead invalid.

- GET /getUserRatingsHandler: It handles individual user ratings request by extracting the search query parameter "username" fromt the request URL. It then retrieves the data from the MySQL "ratings" table that is related to this specific user and sends the JSON response to the client.



Running the API

To run the API, open a terminal and navigate to the project directory ending in "crave-finder\backend", then type the command "go run main.go". Once the terminal displays "Successful connection to the database", it is now available at http://localhost:8080.
If you use instead connect via the front-end to http://localhost:4200, you can run the Golang API by having the front-end communicate with it to create an account, log in, or log out.
