const router = require('express-promise-router')()

const {signup, signin, secrete} = require('../controllers/userController')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/secret', secrete)

module.exports = router
