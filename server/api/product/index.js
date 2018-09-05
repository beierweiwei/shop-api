'use static'

const router = require('koa-router')()
const ProductController = require('./product.controller')
const CateController = require('./cate.controller')
const PropController = require('./prop.controller')
const {needLogin} = require('../../auth')
// router.post('/adduser', controller.addUser)
router.post('/edit/:id', needLogin, ProductController.editProduct)
router.get('/edit/:id', needLogin, ProductController.getProductById)
router.get('/list', ProductController.getProductList)
router.post('/delete/:id', ProductController.deleteProduct)

//批量操作
router.post('/batch', ProductController.batchAction)
// 商品分类
router.post('/cate/remove', CateController.removeProductCate)
router.get('/cate/:id',CateController.getProductCate)
router.post('/cate/:id', CateController.addProductCate)
router.get('/cate', CateController.getProductCateList)

// router.get('/cate/:id/props', CateController.getPropsByCateId)
// router.post('/cate/update/:id', CateController.updateProductCate)

// 商品属性
router.post('/prop/remove', PropController.removeProductProp)
router.get('/prop', PropController.getProductPropList)
router.get('/prop/:id', PropController.getProductProp)
router.post('/prop/:id', PropController.updateProductProp)
// router.post('/prop/add', PropController.createProductProp)

module.exports = router

// 前台api
