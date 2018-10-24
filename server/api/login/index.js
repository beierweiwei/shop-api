const router = require('koa-router')()
const loginController = require('./login.controller')

// 前台
router.post('/login', loginController.login)
router.post('/regist', loginController.regist)
// 后台
router.post('/admin/login', loginController.adminLogin)
router.post('/admin/regist', loginController.regist)
router.get('/captcha', loginController.crateValidateCode)

module.exports = router
