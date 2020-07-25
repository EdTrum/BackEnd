const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String},
    institution: {type: String},
    /**
     * Since it's a profile, none of the fields are a must. A user can choose not to share any additional info
     */
    skills: [{type: String}],
    interests: [{type: String, index: true}],
    bio: {type: String},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Profile', profileSchema)
