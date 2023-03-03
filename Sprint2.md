**Work Done**

Front End:
- Reformatting of the menu page.
- Restaurants now include a category array.
- Restaurants now includes an array of “Restaurants” with different restaurants and their properties.
- Restaurant overall ratings implemented.
- A restaurant’s menu sorts different dishes into their respective category and displays them horizontally under the category.
- Individual web pages are now rendered/routed for different restaurants in the restaurants array.
- Searching feature now implemented.
- Users can search through an existing list of restaurants either by name or by one of the dishes.
- Search results are listed from highest overall rating of restaurant to lowest.
- Cypress unit tests created

Back End:
- For the backend of our group’s application, we have developed a user registration functionality that will allow users to create accounts that will be stored in our database.

- The backend has also developed a functionality that will allow users to remain logged in to their account that they have created.

- A logout functionality has also been developed to allow users to logout of a given account that they registered with on our application.

- In terms of connecting the frontend and backend, we have developed connections that allow for the user to register an account, login to their account, and logout of their account. 

- Our group has also hosted a MySQL database on Oracle Cloud, which will allow all group members to access our application’s database on different devices.




**Testing**

Front End: (All tests done in Cypress)

Home-page component: 
- Tests if the homepage component (specifically the search bar and buttons) render properly.
- Tests if the search bar takes an input properly.
Nav-menu component:
- Tests if the button renders properly.
- Tests to see if the drop-down menu becomes visible after clicking on the nav-menu.
Login-page component:
- Tests if the username box takes an input properly.
- Tests if the password box takes an input properly.
User-registration component:
- Tests if the username box takes an input properly.
- Tests if the password box takes an input properly.



Back End: 
Registration:
- Created a mock test that runs the user registration functionality to see if the function can run correctly.
Login Test: 
- Created a mock test that runs the login functionality to see if the function can run correctly.
Logout Test:
- Created a mock test that runs the logout functionality to see if the function can run correctly.

Functionality and Tests:
https://youtu.be/AJUr_epecns



**Golang API Documentation**

Our Golang API handles user registration, login, and logout that communicates with a MySQL database we created that contains a table named "users" to store user information.

Dependencies
- gorilla/handlers
- gorilla/sessions
- go-sql-driver/mysql


Variables
- db: It holds the connection to the MySQL database.
- store: It holds and handles a session created using gorilla/sessions.


Structs
- User: It contains the username and password of a user that are JSON-encoded and stored as strings.
- RegisterResponse: It contains a JSON-encoded message field that stores a success message or an error message depending on the outcome of the task.


Functions
- main(): It starts the server and sets up the routes for the API.

- registerAuthHandler(): It handles a new user registration by accepting a POST request with a User object; it then checks if the user already exists in the database. If the user does not exist, it creates a new account with a hashed password and stores it in the database. Otherwise, it outputs an error message.

- loginAuthHandler(): It handles authentication for existing users by accepting a POST request with a User object; it then checks if the given username and password match an account in the database.

- logoutHandler(): It ends the current user session by logging the user out.


Endpoints
- POST /registerauth: It handles user registration by receiving a User object (JSON-encoded) in the request body and responding with a RegisterResponse object (JSON-encoded) containing a success or error message depending on the task's outcome.

- POST /loginauth: It handles user login by receiving a User object (JSON-encoded) in the request body and responding with a session cookie if the user is successfully authenticated.

- POST /logout: It handles user logout by getting a valid session cookie in the request; it then ends the current user session.

Running the API
To run the API, open a terminal and navigate to the project directory ending in "crave-finder\backend", then type the command "go run main.go". Once the terminal displays "Successful connection to the database", it is now available at http://localhost:8080.
If you use instead connect via the front-end to http://localhost:4200, you can run the Golang API by having the front-end communicate with it to create an account, log in, or log out.
