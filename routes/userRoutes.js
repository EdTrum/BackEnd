const router = require('express-promise-router')()
const passport = require('passport')
const passportConfig = require('../passport')

const {validateBody, schemas} = require('../helpers/inputValidators')
const {signup, signin, googleOAuth, facebookOAuth, secrete, welcomePage} = require('../controllers/userController')
const passportSignIn = passport.authenticate('local', {session: false})
const passportJwt = passport.authenticate('jwt', {session: false})
const passportGoogle = passport.authenticate('googleToken', {session: false})
const passportFacebook = passport.authenticate('facebookToken', {session: false})

router.get('/', welcomePage)

router.post('/signup', validateBody(schemas.authSchema), signup)
router.post('/signin', validateBody(schemas.authSchema), passportSignIn, signin)
//Google OAuth route
router.post('/oauth/google', passportGoogle, googleOAuth)
//Facebook OAuth route
router.post('/oauth/facebook', passportFacebook, facebookOAuth)

//Sample route that requires authentication
router.get('/secret', passportJwt, secrete)

module.exports = router
