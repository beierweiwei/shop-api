const router = require('koa-router')()
const loginController = require('./admin.controller')

// 前台
// router.post('/login', loginController.login)
// router.post('/regist', loginController.regist)
// 后台
router.post('/login', loginController.adminLogin)
router.post('/regist', loginController.regist)
router.get('/captcha', loginController.crateValidateCode)
router.post('/info', loginController.info)
module.exports = router
