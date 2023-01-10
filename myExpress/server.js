/* 
    Source for this tutorial: 
        - Learn Express JS In 35 Minutes - Web Dev Simplified
        - https://www.youtube.com/watch?v=SccSCuHhOw0
    
    SUMMARY:
    In order to get your server running in real time, you will have to...
        - Install Node.js
        - Create a project 
            - npm init -y
            - creates: "package.json"
        - Install the Express library (our bread ad butter)
            - npm i express
        - Install the dev package Nodemon (to quickly redeploy our server)
            - npm i --save-dev nodemon
        - Create a file for your project: 
            - server.js
        - Manually editing the "package.json" file such that it runs "Nodemon" to 
          to run our server, file by adding the script line within "scripts" section: 
              --> "devStart" : "nodemon server.js"
        - Before running the tutorial, we will need a "View Engine" to render the HTML. 
          In our specific case we'll install EJS
            - npm i ejs
        - Execute said "devStart" script (which uses Nodemon):
            - npm run devStart
    At this point in time, you server will be running (and serving) the file "server.js"
 */
console.log("Starting server!...")

// Use Express
const express =  require('express')
const app = express()

// Set EJS as the View Port
app.set("view engine", "ejs")

app.get('/', (req, res, next) => {
    console.log("Im inside a user GET request!")

    // res.send('Hi')                   // Return a response
    // res.sendStatus(500)              // Return a status code
    // res.status(500).send("Beep!")    // Error 500
    // res.download('server.js')        // downloads a file
    // res.json( { message: "Boop!"})   // Returns a JSON
    res.render("index")                 // This line uses the EJS View Port
    
})

// Listen to port 3000 (e.g. http://localhost:3000)
app.listen(3000)  