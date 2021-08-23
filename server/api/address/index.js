const router = require('koa-router')()
const controller = require('./address.controller')
const { hasRequestPermit, hasUserLogin } = require('../../middleware')
router.get('/my', hasUserLogin, controller.getMyAddressList)
router.get('/my/:id', hasUserLogin, controller.getMyAddress)
router.post('/my/:id', hasUserLogin, controller.updateMyAddress)
router.post('/my', hasUserLogin, controller.createMyAddress)
router.post('/my/delete/:id', hasUserLogin, controller.deleteMyAddress)



router.get('/list', hasRequestPermit('user.user.query'), controller.getUserAddressList)
router.get('/:id', hasRequestPermit('user.user.query'), controller.getAddress)
router.post('/:id', hasRequestPermit('user.user.update'), controller.editAddress)
router.post('/', hasRequestPermit('user.user.create'), controller.createAddress)
router.post('/delete/:id', hasRequestPermit('user.user.delete'), controller.deleteAddress)


module.exports = router