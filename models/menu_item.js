const mongoose = require('mongoose');

// Define the MenuItem Schema
const menu_items_schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        taste: {
            type: String,
            enum: ['sweet', 'spicy', 'sour'],
            required: true
        },
        is_drink: {
            type: Boolean,
            default: false
        },
        ingredients: {
            type: [String],
            default: []
        },
        num_sales: {
            type:  Number,
            default: 0
        }

});

// Create MenuItem Model
const menu_item = mongoose.model('menu_item',menu_items_schema);
module.exports = menu_item;