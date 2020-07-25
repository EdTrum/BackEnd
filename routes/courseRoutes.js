const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})
const {
    addCourse, getCoursesByCatId, getCourse, getCourses, updateCourse, deleteCourse
} = require('../controllers/courseController')

router.route('/courses')
    .get(getCourses)

router.route('/courses/category/:id')
    .post(passportJwt, addCourse)
    .get(getCoursesByCatId)

router.route('/courses/:id')
    .get(getCourse)
    .patch(passportJwt, updateCourse)
    .delete(passportJwt, deleteCourse)

module.exports = router
