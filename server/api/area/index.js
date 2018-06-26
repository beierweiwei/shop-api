const router = require('koa-router')()
const Controller = require('./area.controller')

router.get('/:code', Controller.getAreaListById)

module.exports = router