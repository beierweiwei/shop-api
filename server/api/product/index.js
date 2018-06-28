'use static'

const router = require('koa-router')()
const controller = require('./product.controller')
const {needLogin} = require('../../auth')
// router.post('/adduser', controller.addUser)
router.post('/edit/:id', needLogin, controller.editProduct)
router.get('/edit/:id', needLogin, controller.getProductById)
router.get('/list', needLogin, controller.getProductList)
module.exports = router

// 前台api
