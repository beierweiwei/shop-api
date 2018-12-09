'use static'

const router = require('koa-router')()
const controller = require('./statistics.controller')
// router.post('/adduser', controller.addUser)
// batchAction
router.get('/order', controller.countOrderStatisticsByTime)
module.exports = router

router.get('/all', controller.countAll)
router.get('/today', controller.countToday)