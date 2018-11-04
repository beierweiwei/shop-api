const router = require('koa-router')()
const Controller = require('./postage.controller')

router.get('/', Controller.getPosagetList)
router.get('/:id', Controller.getPosage)
router.post('/', Controller.createPostage)
router.post('/update', Controller.updatePostageById)
router.post('/delete', Controller.deletePostages)

module.exports = router