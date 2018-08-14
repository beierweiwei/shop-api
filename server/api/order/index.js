const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/', controller.createOrder)
router.post('/:id', controller.createOrder)
router.get('/', controller.getOrderList)
module.exports = router
