# Project name
Crave Finder

## Project description
**Frontend code (in 'frontend' branch):**
https://github.com/ZacharyBournand/crave-finder/tree/frontend

**Backend code (in 'backend' branch):**
https://github.com/ZacharyBournand/crave-finder/tree/backend


Our web applicaton seeks to make finding new flavors at local restaurants a piece of cake!

On our web app, the user would be able to search for local restaurants that have a particular menu item they're craving. Want to go and get crab rangoons? No problem. Heard of something that sounded good, but don't know what the name of the restaurant is called? No big deal.

Once the user decides on a restaurant, they will be able to view their menu directly from the web app. In addition to this, each restaurant on our app will have a collection of ratings. A restaurant will have ratings for cleanliness, customer service, wait times, an overall rating, and most importantly: a restaurant's menu will have each item rated individually.

User ratings will be stored on their profile allowing other users to compare tastes and possibly explore dishes and restuarants that people with similar tastes have rated highly.

## Main Takeaways:
- Search for restaurants by menu items
- Rate menu items individually or the restaurant as a whole
- Store food ratings on user profile

## Members
Front-end (Angular/Typescript)
- Jon Dela Cruz
- Renee Kaynor

Back-end (Golang)
- Zachary Bournand
- Dylan Bickram

## How to Run and Use our Application
1. Go to: https://github.com/ZacharyBournand/crave-finder

2. Clone the repository
    - Click on the green "Code" button 
    b) Copy the HTTPS link: https://github.com/ZacharyBournand/crave-finder.git
    c) Open "Git Bash" (or another application to clone the repository)
    d) Paste the copied HTTPS link
    e) Type "code crave-finder" to open the application in Visual Studio Code (or open it in another code editor)

3. Once in a code editor, open a new terminal (the end of your directory should be "\crave-finder")
    a) Go to "frontend" (type "cd frontend) [Now your directory should end with "\crave-finder\frontend")
    b) Type the following commands in your terminal:
            i. npm install angular
            ii. ng add @ng-bootstrap/ng-bootstrap --force

4. Open a new terminal (the end of your directory should also be "\crave-finder")
    a) Go to "backend" (type "cd backend) [Now your directory should end with "\crave-finder\backend")
    b) Type the following commands in your terminal:
            i. go get -u github.com/go-sql-driver/mysql
            ii. go get golang.org/x/crypto/bcrypt
            iii. go get github.com/gorilla/context
            iv. go get github.com/gorilla/sessions
            v. go get github.com/gorilla/handlers
            
5. Run the application:
     a) In your "\crave-finder\frontend" terminal, type the following command to run the frontend: "ng serve"
     b) In your "\crave-finder\backend" terminal, type the following command to run the backend: "go run main.go"
     c) Enter the URL "http://localhost:4200/" in a web browser to access our application
     
6. Have fun!
