const express = require('express');
const app = express();
const db = require('./db');

// const person = require('./models/person');
// const menu_item = require('./models/menu_item');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT ||3000


// Middleware
const logRequest = (req, res) =>{
    console.log(`${new Date().tpLocalString()} Request made to : ${req.originalUrl}`);
    next();
}

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
});

// Import the Router Files
const person_routes = require('./routes/person_routes')
const menu_item_routes = require('./routes/menu_item_roures')

// Use the Routes
app.use('/person', person_routes);
app.use('/menu_item', menu_item_routes);

app.listen(3000)
console.clear();
console.log("Server Is Running at PORT 3000");