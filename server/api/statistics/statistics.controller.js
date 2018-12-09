const mongoose = require('mongoose')
const User = mongoose.model('User')
const Order = mongoose.model('Order')
const Product = mongoose.model('Product')
const ProductCate = mongoose.model('ProductCate')

exports.countToday = async (ctx, next) => {
	const now = Date.now()

	const today = now -  8 * 3600000 - now % (24 * 3600000)
	console.log(today)
	const inTodayQuery = {ctime:  {$gte:  today}}
	try {
	// 订单 
		let allOrderNum  = await Order.count({...inTodayQuery})
		let notPayOrderNum  = await Order.count({status: 0, ...inTodayQuery})
		let notBringOrderNum = await Order.count({status: 1, ...inTodayQuery})
		let applyReturnOrderNum = await Order.count({status: 4, ...inTodayQuery})
	// 用户 
		let newUserNum = await User.count({...inTodayQuery})
		ctx.body = ctx.createRes(200, {allOrderNum, notPayOrderNum, notBringOrderNum, applyReturnOrderNum})
	} catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}	

exports.countAll = async (ctx, next) => {
	try {
		// product
		const allProductNum = await Product.count()
		const allProductCateNum = await ProductCate.count()
		const allRecommendProductNum = await Product.count({isRecomend: 1})
		const allActivityProductNum = await Product.count({isActivity: 1})
		const allNearNoStockProduct = await Product.count({stock: {$lte: 5}})
		// 订单
		const allOrderNum = await Order.count()
		const allReturnOrderNum = await Order.count({status: 4})
		const allNotSubmitOrderNum = await Order.count({status: 2})

		// user 
		const allUserNum = await User.count() 
		const allBlockUserNum = await User.count({block: 1})

		ctx.body = ctx.createRes(200, {
			allProductNum,
			allProductCateNum,
			allRecommendProductNum,
			allActivityProductNum,
			allNearNoStockProduct,
			allOrderNum,
			allReturnOrderNum,
			allNotSubmitOrderNum,
			allUserNum,
			allBlockUserNum
		})
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

exports.countOrderStatisticsByTime = async (ctx, next) => {
	let data = ctx.request.query
	let startTime = data.startTime ||  Date.now() - Date.now() % 86400
	let endTime = data.endTime || Date.now()
	console.log(data, startTime, endTime)
	try {
		let o = {}
		o.map = function () {
			let ctime = Number(this.ctime) 
			let ctimeDayTime = ctime - 8 * 3600000 - ctime % (24 * 3600000)
			emit(ctimeDayTime, 1)
		}
		o.reduce = function (key, values) {
			return values.length
		}
		o.query = {
			ctime: {
				$gte: startTime,
				$lt: endTime
			}
		}
		o.out = { replace: 'orderNumIntimeRange' }
		let ordersStatisticsDc = await Order.mapReduce(o)
		let res = await ordersStatisticsDc.find()
		// console.log(res)
		ctx.body = ctx.createRes(200, res)
		// console.log(orders)
	} catch(err)  {
		ctx.body = ctx.createRes(500, err.message)
	}
}

