const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.


const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    institution: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    //This would be the categories the user is interested in.It should be pulled 
    // form the user interest
    Interest: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);