const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})
const {
    addCourse, getCoursesByCategoryId, getCourseById, getCourses, updateCourse, deleteCourse
} = require('../controllers/courseController')

/** GET fetch a list of courses
 *  Public route
 */
router.get('/courses', getCourses)

/** GET fetch a course by courseId
 *  Public route
 */
router.get('/courses/:courseId', getCourseById)

/** GET fetch a list of courses based on categoryId
 *  Public route
 */
router.get('/category/:categoryId/courses', getCoursesByCategoryId)

/** POST Add a Course based on categoryId
 *  Private route and requires admin privileges
 */
router.post('/categories/:categoryId/course', passportJwt, addCourse)

/** UPDATE a Course
 *  Private route and requires admin privileges
 */
router.put('/course/:courseId', passportJwt, updateCourse)

/** DELETE a courses
 *  Private route and requires admin privileges
 */
router.delete('/course/:courseId', passportJwt, deleteCourse)

module.exports = router
