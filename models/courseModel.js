const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    description: {type: String, required: true},
    avatar: {type: String, required: true},
    link: {type: String, required: true},
    rating: {type: Number, required: true},
    certification: {type: Boolean, required: true},
    fee: {type: Number, requires: true},
    duration: {type: Number, required: true},
    provider: {type: String, required: true,},
    programmingLanguage: [
        {type: String}
    ]
})

module.exports = Course = mongoose.model('Course', courseSchema)
