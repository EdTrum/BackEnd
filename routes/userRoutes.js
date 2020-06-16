const router = require('express-promise-router')()

const {validateBody, schemas} = require('../helpers/inputValidators')
const {signup, signin, secrete} = require('../controllers/userController')

router.post('/signup', validateBody(schemas.authSchema), signup)
router.post('/signin', signin)
router.get('/secret', secrete)

module.exports = router
