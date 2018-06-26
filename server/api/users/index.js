'use static'

const router = require('koa-router')()
const controller = require('./users.controller')
// router.post('/adduser', controller.addUser)
router.get('/list', controller.getUserList)

module.exports = router