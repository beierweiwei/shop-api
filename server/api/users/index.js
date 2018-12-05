'use static'

const router = require('koa-router')()
const controller = require('./users.controller')
// router.post('/adduser', controller.addUser)
// batchAction
router.post('/update', controller.updateUser)
router.post('/delete', controller.deleteUser)
router.get('/list', controller.getUserList)
router.get('/:id', controller.getUser)

//前台 
router.get('/', controller.getMe)
router.post('/edit', controller.updateMe)
router.post('/:id', controller.updateUser)
router.post('/login', controller.login)
router.post('/regist', controller.regist)
module.exports = router