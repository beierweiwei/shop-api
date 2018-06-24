const router = require('koa-router')()
const loginController = require('./login.controller')

router.post('/login', loginController.login)
router.post('/register', loginController.register)

module.exports = router