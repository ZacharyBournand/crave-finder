**WORK DONE**

Front End:
- Made arrays of restaurants an actual array of restaurants (instead of an array of incredibly restaurant-like entities).
- Added support for large dish arrays in the menu, buttons for scrolling through categories added.
- Made user reviews editable/viewable to user on account page
- Made restaurant reviews readonly (only editable by logged-in users on their own page).
- Updated visuals of homepage (background image no longer overflows) and top bar.
- Search bar now uses backend’s Yelp restaurant API
- Login status is now maintained and tracked through the homepage. Added the ability to log out as well.
- Jasmine unit tests created for most components.
- Modified the Search Results page by implementing the form that enables a user to search for a restaurant/food item

Back End:
- Made rating function that stores the ratings made by a user inside our sql database.
- Connected the backend with an API that contains a list of restaurants, foods served, and additional information. It is the Yelp Fusion API.
- Made a function that connect with the Yelp API and the front-end code to retrieve the requested information by a user that searches for a restaurant or food item in a specified city and gets that information from the Yelp API. Then, it sends the data to the front-end to display it.
- Halfway through the implementation of a functionality that allows the user to change their password. It currently retrieves the user's password, a required to authenticate them before allowing this functionality. But it doesn't change an account's password yet.
- Implemented unit tests for completed functions


**TESTING**

Front End:

Home-page component (Cypress tests)
- Tests if the homepage component (specifically the search bar and buttons) render properly.
- Tests if the search bar takes an input properly. Nav-menu component:
- Tests if the button renders properly.
- Tests to see if the drop-down menu becomes visible after clicking on the nav-menu. Login-page component:
- Tests if the username box takes an input properly.
- Tests if the password box takes an input properly. User-registration component:
- Tests if the username box takes an input properly.
- Tests if the password box takes an input properly.


Back End:

- Registration: Created a mock test that runs the user registration functionality to see if the function can run correctly. 

- Login Test: Created a mock test that runs the login functionality to see if the function can run correctly. 

- Logout Test: Created a mock test that runs the logout functionality to see if the function can run correctly.

- Search Test: Created a mock test that runs the search functionality to see if the function can run correctly.

- Rating Test: Created a mock test that runs the rating functionality to see if the function can run correctly.


Demo Video: [https://youtu.be/3y5ngpRvWRM](https://www.youtube.com/watch?v=_PWmEu5GMlE)




**GOLANG API DOCUMENTATION**

Our Golang API handles user registration, login, and logout that communicates with a MySQL database we created that contains a table named "users" to store user information. It also handles restaurant/food items searches by communicating with the Yelp Fusion API to give the requested information to the front-end. Another functionality almost complete is to handle user ratings by storing them in the MySQL database. And a functionality currently being developed is the ability to handle a password change.

Dependencies
- PuerkitoBio/goquery
- gorilla/handlers
- gorilla/sessions
- go-sql-driver/mysql


Variables
- db: It holds the connection to the MySQL database.
- store: It holds and handles a session created using gorilla/sessions.


Structs
- User: It contains the username and password of a user that are JSON-encoded and stored as strings.
- RegisterResponse: It contains a JSON-encoded message field that stores a success message or an error message depending on the outcome of the task.
- Dish: It contains the name, price, and decsription of a food item stored in the Yelp Fusion API.
- Location: It contains a restaurant's 1st & 2nd addresses, city, state, and ZIP code.
- Restaurant: It contains the ID, name, location, rating, price, service, food category, and dishes offered.


Functions
- main(): It starts the server and sets up the routes for the API.

- registerAuthHandler(): It handles a new user registration by accepting a POST request with a User object; it then checks if the user already exists in the database. If the user does not exist, it creates a new account with a hashed password and stores it in the database. Otherwise, it outputs an error message.

- loginAuthHandler(): It handles authentication for existing users by accepting a POST request with a User object; it then checks if the given username and password match an account in the database.

- logoutHandler(): It ends the current user session by logging the user out.

- searchRestaurantsHandler(): It handles restaurant and food item searches by acception a POST request with 2 variable: 'location' and 'searchTerm'. It then retrieves information related to the user's inputs from the Yelp Fusion API and sends it back to the front-end.

- ratingHandler(): It is supposed to store a user's rating of a food item by accepting a POST request with a JSON payload containing information about the user who is submitting the rating. It then retrieves the user's ID from the MySQL "users" table and inserts the rating into another MySQL table called "ratings".

- passwordAuthHandler(): It handles password changes for existing accounts by accepting a POST request with a User object; it then checks if the given username and password match an account in the database. If so, it is supposed to send the user a valid response message giving them the possibility to change their password.


Endpoints
- POST /registerauth: It handles user registration by receiving a User object (JSON-encoded) in the request body and responding with a RegisterResponse object (JSON-encoded) containing a success or error message depending on the task's outcome.

- POST /loginauth: It handles user login by receiving a User object (JSON-encoded) in the request body and responding with a session cookie if the user is successfully authenticated.

- POST /logout: It handles user logout by getting a valid session cookie in the request; it then ends the current user session.

- GET /restaurants/search: It handles search requests by extracting the search query parameters (location, term) from the request URL. It then sends a GET request to the Yelp API and decodes the JSON response into a struct. Then, it converts the struct into JSON format and writes the response to the HTTP response writer.

- POST /rating: It handles the storage of users' ratings for a particular dish in a database. It parses an HTML file called "menu.component.html" and extract the name of the restaurant, the name of the dish that the user is rating, and the rating value selected by the user. Next, the function decodes the JSON data in the request body into a User struct. Then, it inserts the rating information into the database.


Running the API

To run the API, open a terminal and navigate to the project directory ending in "crave-finder\backend", then type the command "go run main.go". Once the terminal displays "Successful connection to the database", it is now available at http://localhost:8080.
If you use instead connect via the front-end to http://localhost:4200, you can run the Golang API by having the front-end communicate with it to create an account, log in, or log out.
