const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})

const{editProfile, getUserProfile, deleteUserProfile} = require('../controllers/profileController')

router.post('/profile', passportJwt, editProfile)
router.get('/profile/:userId', passportJwt, getUserProfile)
router.delete('/profile/:userId/close-account', passportJwt, deleteUserProfile)

module.exports = router
