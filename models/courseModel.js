const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    certification: {
        type: Boolean,
        required: true
    },
    fee: {
        type: Number,
        requires: true
    },
    duration: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true,
    },
    programminglanguages: [{
        type: String
    }]


});

module.exports = Course = mongoose.model('course', CourseSchema);
