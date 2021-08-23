const router = require('koa-router')()
const controller = require('./cart.controller')
const { hasRequestPermit, hasUserLogin } = require('../../middleware')

//前台
router.get('/my', hasUserLogin, controller.getCart)
router.put('/my', hasUserLogin, controller.updateCart)
router.post('/my', hasUserLogin, controller.addCart)

module.exports = router
