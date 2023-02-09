**User Stories**

The following user stories our team attempted to complete before Sprint 1 include:
 - “As a user, I want to create an account, so that I can rate restaurants and food items.” 

- “As a user, I want to log in, so that I can access my account easily.” 

- “As a user, I want to be able to rate a restaurant & individual food items as well as write a review.”

 - “As a user, I want to be able to quickly and easily access the website features and my account page.” &nbsp;



**Plan to address**

<ins>Backend issues we planned to address:</ins>
1. Create MYSQL database
2. Connect Golang to database
3. Develop User registration functionality
4. Develop User Login functionality


<ins>Frontend issues we planned to address:</ins>
1. Create a system for rating dishes and restaurants out of 5-stars.
2. Create the UX that shows the number of stars for a given dish.
3. Create a homepage and navigation system to direct users to their accounts and other pages. (Mostly completed)
4. Create a login page for users to gain access to account features. (Partially completed)



**Successes**

<ins>Backend successes:</ins>
1. Creating the MySQL database with a table containing users’ information
2. Connecting Golang to the database


<ins>Frontend successes:</ins>
1. Component routing to various parts of the web-app had no issues.
2. In addition to creating UX for rating dishes, formatting and display for all the items on a given restaurant’s menu was created, with each item containing all the necessary information.



**Difficulties**

<ins>Frontend difficulties:</ins>
1. The current star rating library ended up being a mess of dependencies and spaghetti code; the stars do display correctly after clicking your desired rating, but not exactly accurately. (1,2)

2. Storage of rating has not yet been implemented, with no connection to the backend with which to store the ratings. (1,2)

3. Currently no functionality for rating the restaurant as a whole, waiting to completely fix the UX for rating dishes before adding that functionality for restaurants. (1,2)

4. Homepage search feature returns values, but does not lead to any results page or placeholder as backend to store that data had not yet been connected. The page lacks any additional site info needed for a new user, but is generally representative of the final functionality. The navigation menu button leads to other parts of the site, but account/login-dependent navigation is not yet implemented (no backend). CSS/visuals are not final. (3)

5. Login page input fields return values, but are not checked by any validators for illegal inputs or connected to any backend functions. CSS/visuals are rudimentary and will be overhauled at a later date. (4)
 
 
<ins>Backend difficulties:</ins>
1. When creating the MySQL database, we wanted to allow both backend developers to have access to the database. However, we encountered multiple issues with that as the database was only accessible on the device that created it.

2. When Dylan tried to connect Go to the MySQL database, he was not able to do so. At first, some errors were fixed. But after some time spent on it, he believes that the root of the problem has to do with the issue where the database can only be accessible on the device it was created on. Therefore, the code that Dylan was using to develop the connection between Go and the MySQL could not function. It was the same issue that prevented Dylan from developing the user login functionality and pushing it onto Github. However, Zachary was able to establish the connection between Go and the MySQL database.

3. The login functionality was not developed before the Sprint 1 due date. The login functionality was pushed back because Dylan, who was assigned the task, could not create a connection between Go and MySQL. When the issue was addressed, Dylan did not have enough time to develop the login functionality.

4. Majority of our difficulties arose from the initial start of collaboration, where we only started backend development with less than a week before the due date. When we started developing the backend we did not have enough time to face the issues we found with our code, preventing us from completing our Sprint 1 milestone of developing a user login functionality.


**Frontend code (in 'frontend' branch):**
https://github.com/ZacharyBournand/crave-finder/tree/frontend

**Backend code (in 'backend' branch):**
https://github.com/ZacharyBournand/crave-finder/tree/backend
