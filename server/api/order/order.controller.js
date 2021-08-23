const mongoose = require('mongoose')
const escapeSearch = require('../../util/escape')
const Order = mongoose.model('Order')
const Product = mongoose.model('Product')
const User = mongoose.model('User')
const Pay = mongoose.model('Pay')
const Address = mongoose.model('Address')
exports.createOrder = async function (ctx) {{
	const data = ctx.request.body
	let user = ctx.session.user
	let order = new Order()
	let total = 0
	order.orderNo = new Date().format('yyMMddhhmmss') + Math.random().toString().slice(2, 7);
	order.status = 0
	order.user = ctx.session.user._id
	// order.products = data.productIds
	order.nums = data.nums
	order.discount_projects = data.discount_projects
	order.postage = data.postage
	let orderProducts = []
	let orderProductIds = []

	try {
		let addressObj = await Address.findOne({_id: data.address}).lean()
		let prods = await Product.find({'subProds._id': {$in: data.productIds}}).populate('props')
		// if (prods.length !== Object.keys(order.prodcutOrder).length) return ctx.body = ctx.createRes(401, '', '部分商品不存在')
		let total = 0
		prods = prods.map((prod, idx) => {
			let prodObj = JSON.parse(JSON.stringify(prod))
				delete prodObj.subProds
			prod.subProds.map(subProd => {
				subProd.price = Number(subProd.price) || 0
				let idx = data.productIds.indexOf(subProd._id.toString())
				if (~idx) {

					let subProdObj = JSON.parse(JSON.stringify(subProd))

					prodObj.props = prod.props.map(prop => prop.name)
					orderProducts.push({...prodObj, ...subProdObj})
					let num = Number(data.nums[idx]) || 0
					total += Number(subProd.price) * (num || 0)
					subProd.stock = Number(subProd.stock) - num
					subProd.saleNum = Number(subProd.saleNum) + num
					prod.stock = Number(prod.stock) - num
					prod.saleNum = Number(prod.saleNum) + num

					if (subProd.stock < 0) {
						// return ctx.body = ctx.createRes(200, '库存不足')
						ctx.throw('库存不足')
					}
				}
			})
			return prod
		})
		await Promise.all(prods.map(prod => prod.save()))
		order.total = total
		order.products = orderProducts
		order.address = addressObj
		let res = await order.save()
		return ctx.body = ctx.createRes(200, res)
	}catch(err) {
		return ctx.body = ctx.createRes(500, err.message)
	}
}}
exports.getOrderList = async function (ctx) {
	try {
		let query = ctx.query
	  let sort = query.sort || ''
	  let pageNum = parseInt(query.pageNum)
	  pageNum = pageNum && pageNum > 0 ? pageNum : 1
		let pageSize  = parseInt(query.pageSize)
		pageSize = pageSize && pageSize > 0 ? pageSize : 10
		let list = await Order.find().sort(sort).skip((pageNum -1 ) * pageSize).limit(pageSize).populate({path: 'user', select: 'username'}).lean()
		let count = await Order.count()
		return ctx.body = ctx.createRes(200, {list, count, pageNum, pageSize})
	}catch(err) {
		return ctx.body = ctx.createRes(500, err.message)
	}
}
exports.getOrder =   async function (ctx) {
	const orderId = ctx.params.id
	const user = ctx.session.user
	const admin = ctx.session.admin
	if (!user && !admin) return ctx.body = ctx.createRes(201)
	if (!orderId) return ctx.body = ctx.createRes(401)
	try {
		let res = await Order.findOne({_id: orderId})
		if (!admin && user._id.toString() !== res.user.toString()) {
			return  ctx.body = ctx.createRes(401, '订单未找到！')
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.deleteOrder = async function (ctx) {
	const orderId =  ctx.params.id
	const user = ctx.session.user
	const admin = ctx.session.admin
	if (!admin || !user) return ctx.body = ctx.createRes(201)
	try {
		const orderDc = await Order.findOne({_id: orderId})
		if (!admin && user._id.toString !== orderDc.user.toString()) {
			return ctx.body = ctx.createRes(401, '订单不存在！')
		}
		const result = await Order.findOneAndRemove({_id: orderId})
		ctx.body = ctx.createRes(200, result)
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.createStatement = async function (ctx) {
	let user = ctx.session.user
	let data = ctx.request.body
	try {
		let prods = await Product.find({'subProds._id': {$in: data.productIds}}).lean()
		// if (prods.length !== Object.keys(order.prodcutOrder).length) return ctx.body = ctx.createRes(401, '', '部分商品不存在')
		let total = 0
		let stateProds = []
		prods.forEach((prod, idx) => {
			prod.subProds.forEach(subProd => {
				let isCurtSubProd = !!~data.productIds.indexOf(subProd._id.toString())
				if (isCurtSubProd) {
					const price = Number(subProd.price) || 0
					const buyNum = Math.ceil(data.nums[idx]) || 0
					total += price * buyNum
					stateProds.push({...prod, ...subProd, price, buyNum})
				}
			})
		})
		ctx.body = ctx.createRes(200, {total, products: stateProds})
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.createPay = async function (ctx) {
	let user = ctx.session.user
	const query = ctx.query
	const { password = ''} = ctx.request.body
	let orderId  = ctx.params.id
	try {
		let userDc = await User.findOne({'_id': user._id})
		let orderDc = await Order.findOne({'_id': orderId})
		if (userDc.payPassword !== password.toString()) return ctx.body = ctx.createRes(203, '', '支付密码错误！')
		if (orderDc.status >  0) return ctx.body = ctx.createRes(200, '订单已支付')
		if ( orderDc && userDc._id.toString() === orderDc.user.toString()) {
			if (orderDc.total > userDc.money) return ctx.body = ctx.createRes(203, '', '余额不足！')
			userDc.money = Number(userDc.money - orderDc.total)
			orderDc.status = 1 //已支付
			orderDc.ptime = Date.now()
			let shopId = query.shopId
			let platformId = query.platformId || 0
			await userDc.save()
			await orderDc.save()
			let payDc = {
				order: orderDc._id,
				amount: orderDc.total,
				user: user._id,
				platform: platformId
			}
			if (shopId) payDc.shop = shopId
			await Pay.create(payDc)
			ctx.body = ctx.createRes(200, '支付成功！')
		} else {
			return ctx.body = ctx.createRes('404', '订单不存在')
		}
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.updateOrders = async function (ctx) {
	const data = ctx.request.body
	let ids = data.ids
	const mondify = data.modify
	let tempData = {}
	const accessField = ['status'].filter(item => {
		tempData[item] = mondify[item]
	})
	if (!ids) return ctx.body = ctx.createRes(401)
	try {
		ids = Array.isArray(ids) ? ids : [ids]
		let res  = await Order.findManyAndUpdate({_id: {
			$in: ids
		}}, {$set: tempData})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(501, err.message)
	}
}

exports.updateOrder = async function (ctx) {
	const id = ctx.params.id
	const data = ctx.request.body
	if (!id) return ctx.body = ctx.createRes(401)
	try {
		let orderDc = await Order.findOne({_id: id})
		if (data.change) {
			let changeTotal = Math.floor(data.change * 100)/100
			if (!changeTotal) return ctx.body = ctx.createRes(401)
			orderDc.total = orderDc.total + changeTotal
			if (orderDc.total < 0) ctx.body = ctx.createRes(401,
				'总金额不能小于0')
			orderDc.changes.push(changeTotal)
		}
		orderDc.status = data.status
		orderDc.address = data.address
		let res = await orderDc.save()
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.deleteOrders = async function (ctx) {
	const data = ctx.request.body
	let ids = data.ids
	if (!ids) return ctx.body = ctx.createRes(401)
	try {
		ids = Array.isArray(ids) ? ids : [ids]
		let res  = await Order.remove({_id: {
			$in: ids
		}})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(501, err.message)
	}
}

exports.search = async function (ctx) {
	let query = ctx.request.query
	let { searchText = '',  pageSize = 10, pageNum = 1} = query
	searchText = escapeSearch(searchText)
	pageSize = parseInt(pageSize)
	pageNum = parseInt(pageNum)
	// 关联模糊查询
	let reg = new RegExp(searchText, 'i')
	let findOper = [
		{$lookup: {
			from: 'users',
			localField: 'user',
			foreignField: '_id',
			as: 'user'
		}},
		{$match: {
			$or: [
				{orderNo: {$regex: reg}},
				{'user.username': {$regex: reg}}
			]
		}},
		{
			$limit: pageSize
		},
		{
			$skip: (pageNum - 1) * pageSize
		}
	]
	let countOper = [...findOper, {
		$count: 'count'
	}]
	try {
		let res = await Order.aggregate(findOper)
		let count = await Order.aggregate(countOper)
		count = count[0].count
		ctx.body = ctx.createRes(200, {list: res, count})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
// 取消，删除，退货 订单状态修改
exports.updateMyOrder = async function (ctx) {
	const data = ctx.request.body
	const id = data.id
	const userId = ctx.session.user._id
	const accessModifyStatus = [0, 3, 4]
	let tempData = {}
	['status'].filter(field => {
		tempData[field] = data[field]
	})
	const status = tempData.status
	if (status) {
		tempData.status = status = parseInt(status)
		if (!~accessModifyStatus.indexOf(status)) {
			ctx.body = ctx.createRes(401)
		}
	}
	if (!id) ctx.body = ctx.createRes(401)

	try {
		let orderDc = await Order.findOne({_id: id})
		if (tempData.status && tempData.status < orderDc.status) ctx.body = ctx.createRes(401)
		orderDc.status = data.status
		let res = await orderDc.save()
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getMyOrder = async function (ctx) {
	const orderId = ctx.params.id
	const user = ctx.session.user
	if (!orderId) return ctx.body = ctx.createRes(401)
	try {
		let res = await Order.findOne({_id: orderId, user: user._id})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getMyOrderList = async function (ctx) {
	let {pageSize = 10, curtPage = 1, sort} = ctx.request.query
	pageSize = parseInt(pageSize)
	curtPage = parseInt((curtPage))
	const user = ctx.session.user
	try {
		let res = await Order.find({user: user._id}).skip(pageSize * (curtPage -1)).limit(pageSize).sort(sort)
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}


