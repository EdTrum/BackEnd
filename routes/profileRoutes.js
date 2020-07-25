const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})

const{createProfile, getProfiles, getProfile, deleteProfile} = require('../controllers/profileController')

router.route('/profiles')
    .get(passportJwt, getProfiles)
    .post(passportJwt, createProfile)
router.route('/profiles/:id')
    .get(passportJwt, getProfile)
    .delete(passportJwt, deleteProfile)

module.exports = router
