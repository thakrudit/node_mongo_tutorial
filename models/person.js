const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

person_schema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(person.password, salt);
      person.password = hashPassword;
      next();

        
    } catch (err) {
        return next(err);
    }

});

person_schema.methods.comarePassword = async function(condidatePassword){
    try {
        const isMatch = await bcrypt.compare(condidatePassword, this.password);
        return isMatch;
        
    } catch (err) {
        throw err;
        
    }
}

// Create Person Model
const person = mongoose.model('person', person_schema);
module.exports = person;