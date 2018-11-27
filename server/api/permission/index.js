const { hasEditPermit, hasRequestPermit } = require('../../middleware')
const router = require('koa-router')()
const controller = require('./permission.controller')

router.post('/', hasRequestPermit('admin.role.add'), controller.create)
router.post('/update', hasRequestPermit('admin.role.update'), controller.update)
router.post('/delete', hasRequestPermit('admin.role.delete'), controller.delete)
router.get('/', hasRequestPermit('admin.role.query'), controller.getList)
router.get('/:id', hasRequestPermit('admin.role.query'), controller.getOne)

module.exports = router
