'use static'

const router = require('koa-router')()
const controller = require('./users.controller')
console.log(controller)
// router.post('/adduser', controller.addUser)
router.get('/getuserlist', controller.getUserList)

module.exports = router