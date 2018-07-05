'use static'

const router = require('koa-router')()
const ProductController = require('./product.controller')
const CateController = require('./cate.controller')
const PropController = require('./prop.controller')
const {needLogin} = require('../../auth')
// router.post('/adduser', controller.addUser)
router.post('/edit/:id', needLogin, ProductController.editProduct)
router.get('/edit/:id', needLogin, ProductController.getProductById)
router.get('/list', needLogin, ProductController.getProductList)

// 商品分类
router.get('/cate/:id',CateController.getProductCate)
router.post('/cate/add', CateController.addProductCate)
router.get('/cate', CateController.getProductCateList)
router.post('/cate/remove', CateController.removeProductCate)
router.post('/cate/update/:id', CateController.updateProductCate)

// 商品属性

router.get('/prop', PropController.getProductPropList)
router.get('/prop/:id', PropController.getProductProp)
router.post('/prop/update/:id', PropController.updateProductProp)
router.post('/prop/add', PropController.createProductProp)
router.post('/prop/remove', PropController.removeProductProp)
module.exports = router

// 前台api
