const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongodb connection url
// const mongoURL = "mongodb://localhost:27017/hotel_details"
// const mongoURL = 'mongodb+srv://helloworld:Udit1234@cluster0.0pjfqlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoURL = process.env.MONGODB_URL;

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