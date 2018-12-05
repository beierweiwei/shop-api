const router = require('koa-router')()
const adminController = require('./admin.controller')
const { hasEditAminPermit,  hasAdminLogin} = require('../../middleware')

// 前台
// router.post('/login', adminController.login)
// router.post('/regist', adminController.regist)
// 后台
router.post('/login', adminController.adminLogin)
router.post('/', hasEditAminPermit, adminController.adminRegist)
router.get('/captcha', adminController.crateValidateCode)
router.get('/', hasEditAminPermit, adminController.getList)
router.get('/:id', hasEditAminPermit, adminController.getOne)
router.post('/update', hasEditAminPermit, adminController.update)
router.post('/delete', hasEditAminPermit, adminController.delete)
router.post('/info', hasAdminLogin, adminController.getInfo)
router.post('/info', adminController.info)
module.exports = router
