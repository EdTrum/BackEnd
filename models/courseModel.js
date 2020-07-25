const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {type: String, required: true},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
    description: {type: String, required: true},
    avatar: {type: String, required: true},
    courseLink: {type: String, required: true},
    rating: {type: Number, required: true},
    certification: {type: Boolean, required: true},
    fee: {type: Number, requires: true},
    duration: {type: Number, required: true},
    provider: {type: String, required: true,},
    progLanguages: [
        {type: String}
    ],
    createdAt: {type: Date, default: Date.now}
})

module.exports = Course = mongoose.model('Course', courseSchema)
