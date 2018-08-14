const mongoose = require('mongoose')
const Order = mongoose.model('Order')
const Product = mongoose.model('Product')

exports.createOrder = async function (ctx) {
	const data = ctx.request.body
	let order = new Order()
	let res 
	order.orderNo = new Date().format('yyMMddhhmmss') + Math.random().toString().slice(2, 7);
	order.status = 0
	order.userId = ctx.session.user.userId 
	order.productIds = data.productIds
	order.nums = data.nums 
	order.discount_total = data.discount_total
	order.discount_projects = data.discount_projects
	// order.total = data.total
	// getProduct 
	try {
		let prods = await Product.find({'_id': {$in: data.productIds}})
		if (prods.length !== order.productIds.length) return ctx.body = ctx.createRes(401, '', '部分商品不存在')
		let total = 0
		prods.forEach((prod, idx) => total += (prod.price || 0) * order.nums[idx] || 0)
		order.total = total
		let res = await order.save()
		return ctx.body = ctx.createRes(200, res)
	}catch(err) {
		return ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getOrderList = async function (ctx) {
	try {
		let list = await Order.find().populate('productIds')
		let count = await Order.count()
		return ctx.body = ctx.createRes(200, {list, count})
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}