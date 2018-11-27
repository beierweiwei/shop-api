const router = require('koa-router')()
const Controller = require('./postage.controller')
const { hasRequestPermit } = require('../../middleware')
router.get('/', hasRequestPermit('postage.postage.query'), Controller.getPosagetList)
router.get('/:id', hasRequestPermit('postage.postage.query'), Controller.getPosage)
router.post('/', hasRequestPermit('postage.postage.query'), Controller.createPostage)
router.post('/update', hasRequestPermit('postage.postage.update'), Controller.updatePostageById)
router.post('/delete', hasRequestPermit('postage.postage.delete'), Controller.deletePostages)

module.exports = router