const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
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
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = Category = mongoose.model('Category', categorySchema);
