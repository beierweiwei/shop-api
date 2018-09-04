const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/', controller.createOrder)
//router.post('/:id', controller.createOrder)
router.post('/delete/:id', controller.deleteOrder)
router.post('/pay/:id', controller.createPay)
router.get('/', controller.getOrderList)
router.get('/:id', controller.getOrder)
router.post('/statement/', controller.createStatement)
module.exports = router
