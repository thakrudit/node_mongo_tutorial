const mongoose = require('mongoose');

// Define the Person Schema
const person_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salery: {
        type: Number,
        required: true
    }
});

// Create Person Model
const person = mongoose.model('person', person_schema);
module.exports = person;