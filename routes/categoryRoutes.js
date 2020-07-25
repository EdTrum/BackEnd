const router = require('express-promise-router')()
const passport = require('passport')

const passportJwt = passport.authenticate('jwt', {session: false})
const {addCategory, deleteCategory, getCategories, getCategory, updateCategory} = require('../controllers/categoryController')

router.route('/categories')
    .get(getCategories)
    .post(passportJwt, addCategory)
router.route('/categories/:id')
    .get(getCategory)
    .patch(passportJwt, updateCategory)
    .delete(passportJwt, deleteCategory)

module.exports = router
