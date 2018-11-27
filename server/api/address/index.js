const router = require('koa-router')()
const controller = require('./address.controller')
const { hasRequestPermit } = require('../../middleware')
router.get('/list', hasRequestPermit('user.user.query'), controller.getUserAddressList)
router.get('/:id', hasRequestPermit('user.user.query'), controller.getAddress)
router.post('/:id', hasRequestPermit('user.user.update'), controller.editAddress)
router.post('/', hasRequestPermit('user.user.create'), controller.createAddress)
router.post('/delete/:id', hasRequestPermit('user.user.delete'), controller.deleteAddress)

module.exports = router