const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

//Create a schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {type: String, lowercase: true},
        password: {type: String},
        avatar: {type: String}
    },
    google: {
        id: {type: String},
        email: {type: String, lowercase: true},
        avatar: {type: String}
    },
    facebook: {
        id: {type: String},
        email: {type: String, lowercase: true},
        avatar: {type: String}
    },
    role: {type: String, lowercase: true, default: 'user'},
    createdAt: {type: Date, default: Date.now}
})

userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next()
        }
        //Generate a salt
        const salt = await bcrypt.genSalt(10)
        //General password has (salt + has)
        this.local.password = await bcrypt.hash(this.local.password, salt)
        next()
    } catch (e) {
        next(e)
    }
})

userSchema.methods.isValidPassword = async function (userPassword) {
    try {
        return await bcrypt.compare(userPassword, this.local.password)
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = mongoose.model('Users', userSchema)
