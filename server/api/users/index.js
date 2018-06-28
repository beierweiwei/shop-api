'use static'

const router = require('koa-router')()
const controller = require('./users.controller')
// router.post('/adduser', controller.addUser)
router.get('/list', controller.getUserList)
router.get('/:id', controller.getUser)
router.post('/:id', controller.updateUser)
module.exports = router