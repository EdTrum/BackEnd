const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})

const{editProfile} = require('../controllers/profileController')

router.post('/profile', passportJwt, editProfile)

module.exports = router
