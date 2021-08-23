const router = require('koa-router')()
const controller = require('./order.controller')
const { hasRequestPermit, hasUserLogin } = require('../../middleware')

//前台
router.post('/', hasUserLogin, controller.createOrder)
router.get('/my', hasUserLogin, controller.getMyOrderList)
router.get('/my/:id', hasUserLogin, controller.getMyOrder)
router.post('/my', hasUserLogin, controller.updateMyOrder)
//router.post('/:id', controller.createOrder)
router.get('/search', controller.search)

router.post('/delete/', hasRequestPermit('order.order.delete'), controller.deleteOrders)
router.post('/delete/:id', hasRequestPermit('order.order.delete'), controller.deleteOrder)
router.post('/update/', hasRequestPermit('order.order.update'), controller.updateOrders)
router.post('/update/:id', hasRequestPermit('order.order.update'), controller.updateOrder)
router.get('/', hasRequestPermit('order.order.query'), controller.getOrderList)
router.get('/:id', hasRequestPermit('order.order.query'), controller.getOrder)

router.post('/statement/', hasUserLogin, controller.createStatement)
router.post('/pay/:id', hasUserLogin, controller.createPay)

module.exports = router
