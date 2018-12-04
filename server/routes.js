const Router = require('koa-router')()
const Users = require('./api/users')
const Login = require('./api/login')
const Upload = require('./api/upload')
const Product = require('./api/product')
const Area = require('./api/area')
const Address = require('./api/address')
const Order = require('./api/order')
const Admin = require('./api/admin')
module.exports = function (app) {
		Router.use('/user', Users.routes(), Users.allowedMethods())
		// Router.use('/login', Login.routes(), Login.allowedMethods())
		Router.use('/product', Product.routes(), Product.allowedMethods())
		Router.use('/', Upload.routes(), Upload.allowedMethods())
		Router.use('/area', Area.routes(), Area.allowedMethods())
		Router.use('/address', Address.routes(), Address.allowedMethods())
		Router.use('/order', Order.routes(), Order.allowedMethods())
		Router.use('/admin', Admin.routes(), Admin.allowedMethods())
		Router.get('/*', (ctx,next)=> {
			ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
		})
	app.use(Router.routes())
}