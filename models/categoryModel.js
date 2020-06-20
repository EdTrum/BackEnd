const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

module.exports = Category = mongoose.model('category', CategorySchema);
