const router = require('koa-router')()
const Article = require('./article.controller')
const ArticleCate = require('./articleCate.controller.js')
const { hasRequestPermit } = require('../../middleware') 
// cate
router.get('/cate', ArticleCate.getList)
router.get('/cate/:id', ArticleCate.getOne)
router.post('/cate', ArticleCate.update)
router.post('/cate/delete', ArticleCate.delete)

// article
router.post('/', hasRequestPermit('article.article.create'), Article.update)
//router.post('/:id', Article.createOrder)
router.post('/delete', hasRequestPermit('article.article.delete'), Article.delete)
router.post('/update', hasRequestPermit('article.article.update'), Article.update)
router.post('/update/:id', hasRequestPermit('article.article.update'), Article.update)
router.get('/:id', Article.getOne)
router.get('/', Article.getList)

module.exports = router
