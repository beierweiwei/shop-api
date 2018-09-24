'use static'

const router = require('koa-router')()
const ProductController = require('./product.controller')
const CateController = require('./cate.controller')
const PropController = require('./prop.controller')
const {needLogin} = require('../../auth')


// 商品分类
router.post('/cate/batch', CateController.batchAction)
router.post('/cate/remove', CateController.removeProductCate)
router.get('/cate/:id',CateController.getProductCate)
router.post('/cate/:id', CateController.addProductCate)
router.get('/cate', CateController.getProductCateList)

// router.get('/cate/:id/props', CateController.getPropsByCateId)
// router.post('/cate/update/:id', CateController.updateProductCate)

// 商品属性
router.post('/prop/batch', PropController.batchAction)
router.post('/prop/remove', PropController.removeProductProp)
router.get('/prop', PropController.getProductPropList)
router.get('/prop/:id', PropController.getProductProp)
router.post('/prop/:id', PropController.updateProductProp)
// router.post('/prop/add', PropController.createProductProp)
// // router.post('/adduser', controller.addUser)
//批量操作
router.post('/batch', ProductController.batchAction)
router.post('/:id', needLogin, ProductController.editProduct)
router.get('/list', ProductController.getProductList)
router.get('/:id', needLogin, ProductController.getProductById)
router.post('/delete/:id', ProductController.deleteProduct)

module.exports = router

// 前台api
