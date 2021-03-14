// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(8000, ()=> console.log(`the server is running on port: 8000...`));

//GET method
app.get('/all', (req, res)=> res.send(projectData).status(200).end());

// POST method
app.post('/add', (req, res)=> {

    let data = req.body;
    console.log('server-side data:', data);

    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
   res.send(projectData).status(200).end();
});




