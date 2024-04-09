const express = require('express');
const app = express();
const db = require('./db');
// require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',  function (req, res) {
    res.send('Welcome to our Hotel');
});

// Import the Router Files
const person_routes = require('./routes/person_routes')
const menu_item_routes = require('./routes/menu_item_roures')

// Use the Routes
app.use('/person',localAuthMiddleware, person_routes);
app.use('/menu_item', menu_item_routes);


app.listen(PORT, ()=>{
    console.log(`listening on port : ${PORT}`);
})