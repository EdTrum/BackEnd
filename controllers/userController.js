const User = require('../models/userModel')
const Jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const {JWT_SECRET} = require('../config')

const signToken = user => {
    return Jwt.sign({
        iss: 'Edtrum',
        sub: user.id,
        email: user.email,
        role: user.role,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7)
    }, JWT_SECRET)
}

exports.welcomePage = (req, res) => {
    return res.status(200).json({message: 'Hello everyone'})
}

exports.signup = async (req, res) => {
    const {email, password} = req.value.body
    //Check if user with the same email exists
    const foundUser = await User.findOne({
        'local.email': email
    })
    if (foundUser) return res.status(403).json({
        email: 'Already in use'
    })
    //Create a new User
    const newUser = new User({
        method: 'local',
        local: {
            email: email,
            password: password,
            avatar: gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
        }
    })
    await newUser.save()

    //Respond with a token
    const token = signToken(newUser)
    res.status(201).json({
        token
    })
}

exports.seedAdmin = async (req, res) => {
    const admin = new User({
        method: 'local',
        local: {
            email: 'admin@admin.com',
            password: 'password',
            avatar: gravatar.url('admin@admin.com', {s: '200', r: 'pg', d: 'mm'})
        },
        role: 'admin'
    })
    const foundUser = await User.findOne({
        'local.email': admin.local.email
    })
    if (foundUser) return res.status(403).json({
        email: 'Already added'
    })
    await admin.save()
    res.status(201).json({
        message: 'Admin added'
    })
}

exports.signin = async (req, res) => {
    const token = signToken(req.user)
    res.status(200).json({
        token
    })
}

exports.googleOAuth = async (req, res) => {
    //Generate token
    const token = signToken(req.user)
    res.status(200).json({
        token
    })
}

exports.facebookOAuth = async (req, res) => {
    const token = signToken(req.user)
    res.status(200).json({
        token
    })
}

exports.getUsers = async (req, res) => {
    if (req.user.role === 'admin'){
        const users = await User.find()
        return res.status(200).json(users)
    } else {
        return res.status(400).json({
            message: 'Unauthorized request'
        })
    }
}

exports.secrete = async (req, res) => {
    res.json({
        message: 'Accessing a secrete resource'
    })
}
