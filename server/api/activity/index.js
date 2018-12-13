const router = require('koa-router')()
const controller = require('./activity.controller')
// const couponController = require('./coupon.controller')
const { hasRequestPermit, hasUserLogin } = require('../../middleware')

router.get('/:id', controller.get)
router.get('/', controller.getList)
router.post('/', controller.create)
router.get('/search', controller.search)
router.post('/delete', controller.delete)
router.post('/update', controller.update)

module.exports = router
