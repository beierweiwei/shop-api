const router = require('koa-router')()
const controller = require('./address.controller')

router.get('/list', controller.getUserAddressList)
router.get('/:id', controller.getAddress)
router.post('/:id', controller.editAddress)
router.post('/', controller.addAddress)
router.post('/remove/:id', controller.editAddress)

module.exports = router