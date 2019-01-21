const router = require('koa-router')()
const adminController = require('./admin.controller')
const { hasEditAminPermit,  hasAdminLogin} = require('../../middleware')


// 管理员信息只能管理员自己和高级管理员（level > 当前level && 当前管理员具有管理帐号权限）查看和修改
router.get('/info', adminController.getInfo)
router.post('/info', adminController.updateInfo)
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


module.exports = router
