const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})
const {addCourse, getCourses} = require('../controllers/courseController')

router.get('/courses', getCourses)
router.post('/category', addCourse)

module.exports = router
