'use static'

const router = require('koa-router')()
const controller = require('./product.controller')
// router.post('/adduser', controller.addUser)
router.post('/edit/:id', controller.editProduct)
router.get('/edit/:id', controller.getProductById)
router.get('/list', controller.getProductList)
module.exports = router