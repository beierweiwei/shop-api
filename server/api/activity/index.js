const router = require('koa-router')()
const controller = require('./activity.controller')
const couponController = require('./coupon.controller')
const { hasRequestPermit, hasUserLogin } = require('../../middleware')

router.get('/coupon', couponController.getList)
router.get('/coupon/:id', couponController.getOne)
router.post('/coupon', couponController.create)
router.post('/coupon/update', couponController.update)
router.post('/coupon/delete', couponController.delete)
router.post('/coupon/collect', couponController.collect)

router.get('/:id', controller.get)
router.get('/', controller.getList)
router.post('/', controller.create)
router.get('/search', controller.search)
router.post('/delete', controller.delete)
router.post('/update', controller.update)



module.exports = router
