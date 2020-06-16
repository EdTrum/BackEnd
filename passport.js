const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GoogleTokenStrategy = require('passport-google-plus-token')

const {JWT_SECRET} = require('./config/index')
const User = require('./models/userModel')

//JWT Strategies
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //Find the user specified in token
        const user = await User.findById(payload.sub)
        //If no user handle occurrence
        if (!user) return done(null, false)
        //Otherwise return user
        done(null, user)
    } catch (e) {
        done(e, false)
    }
}))

//Local Strategies
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //Find the user with given email
        const user = await User.findOne({'local.email': email})
        //If not handle occurrence
        if (!user) return done(null, false)
        //If user, check if password is correct
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) return done(null, false)
        //Otherwise return the user
        done(null, user)
    } catch (e) {
        done(e, false)
    }
}))

//Google OAuth Strategy
passport.use('googleToken', new GoogleTokenStrategy({
    clientID: '254549277545-t4rljtihh9e99e9t92v5h53v66759dkv.apps.googleusercontent.com',
    clientSecrete: 'k5nFsi4Qdn6gdPaUfC-dcLKd'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({"google.id": profile.id})
        if (existingUser) return done(null, existingUser)
        //Create new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch (e) {
        done(e, false)
    }
}))
