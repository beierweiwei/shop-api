'use static'

const router = require('koa-router')()
const controller = require('./users.controller')
// router.post('/adduser', controller.addUser)
// batchAction
router.post('/update', controller.updateUsers)
router.post('/delete', controller.deleteUsers)
router.get('/list', controller.getUserList)
router.get('/:id', controller.getUser)
router.post('/:id', controller.updateUser)
module.exports = router