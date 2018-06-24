const Router = require('koa-router')()
const Users = require('./api/users')
const Login = require('./api/login')
const Upload = require('./api/upload')
const Product = require('./api/product')
module.exports = function (app) {
		Router.use('/users', Users.routes(), Users.allowedMethods())
		Router.use('/login', Login.routes(), Login.allowedMethods())
		Router.use('/product', Product.routes(), Product.allowedMethods())
		Router.use('/', Upload.routes(), Upload.allowedMethods())
		Router.get('/*', (ctx,next)=> {
			ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
		})
	app.use(Router.routes())
}