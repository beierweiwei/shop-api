const Router = require('koa-router')()
const users = require('./api/users')

module.exports = function (app) {
		Router.use('/users', users.routes(), users.allowedMethods())
		Router.get('/*', (ctx,next)=> {
			ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
		})
	app.use(Router.routes())
}