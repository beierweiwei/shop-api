const Router = require('koa-router')()
const Users = require('./api/users')
const Admin = require('./api/admin')
const Upload = require('./api/upload')
const Product = require('./api/product')
const Area = require('./api/area')
const Address = require('./api/address')
const Order = require('./api/order')
const Cart = require('./api/Cart/cart.controller') 
const Postage = require('./api/postage')
const Article = require('./api/Article')
const Permission = require('./api/permission')
module.exports = function (app) {
		Router.use('/', Upload.routes(), Upload.allowedMethods())
		Router.use('/user', Users.routes(), Users.allowedMethods())
		Router.use('/product', Product.routes(), Product.allowedMethods())
		Router.use('/area', Area.routes(), Area.allowedMethods())
		Router.use('/address', Address.routes(), Address.allowedMethods())
		Router.use('/order', Order.routes(), Order.allowedMethods())
		Router.use('/admin', Admin.routes(), Admin.allowedMethods())
    Router.post('/cart', Cart.getCartList)
    Router.use('/postage', Postage.routes(), Postage.allowedMethods())
    Router.use('/article', Article.routes(), Article.allowedMethods())
    Router.use('/permission', Permission.routes(), Permission.allowedMethods())
		Router.get('/*', (ctx,next)=> {
			ctx.body = {status:'success',data:'请求接口不存在！'}
		})
	app.use(Router.routes())
}
