const mongoose = require('mongoose');

// Define the mongodb connection url
const mongoURL = "mongodb://localhost:27017/hotel_details"

// Set up the mongo connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// get the default connection
const db = mongoose.connection;

// Define event listeners for databasee connection
db.on('connected', ()=> {
    console.log('Connected to mongodb server');
})

db.on('error', (err)=> {
    console.log('Mongodb Connection error', err);
})

db.on('disconnected', ()=> {
    console.log('Disconnected to mongodb server');
})

// Export db connection
module.exports = db;