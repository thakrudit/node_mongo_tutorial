const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); //Move to the next phase
}
app.use(logRequest); //Used in all Routes

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',localAuthMiddleware,  function (req, res) {
    res.send('Welcome to our Hotel');
});

// Import the Router Files
const person_routes = require('./routes/person_routes')
const menu_item_routes = require('./routes/menu_item_roures')

// Use the Routes
app.use('/person', person_routes);
app.use('/menu_item', menu_item_routes);

// Listening to Localhost Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.clear();
    console.log(`listening on port : ${PORT}`);
})