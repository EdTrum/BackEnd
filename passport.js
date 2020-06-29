const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GoogleTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')

const {
    JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET
} = require('./config/index')
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
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
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

//Facebook OAuth Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({'facebook.id': profile.id})
        if (existingUser) return done(null, existingUser)

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch (e) {
        done(e, false, e.message)
    }
}))
