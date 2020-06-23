const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})
const {
    addCategory, deleteCategory, getCategories, getCategoryById, updateCategory
} = require('../controllers/categoryController')

/** GET fetch a list of categories
 *  Public route
 */
router.get('/categories', getCategories)

/** POST Add a category
 *  Private route and requires admin privileges
 */
router.post('/add-category', passportJwt,addCategory)

/** GET fetch a category by id
 *  Public route
 */
router.get('/category/:categoryId', getCategoryById)

/** UPDATE a category
 *  Private route and requires admin privileges
 */
router.put('/category/:categoryId', passportJwt, updateCategory)

/** DELETE a category
 *  Private route and requires admin privileges
 */
router.delete('/category/:categoryId', passportJwt, deleteCategory)

module.exports = router
