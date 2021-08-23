const mongoose = require('mongoose')
const CartModel = mongoose.model('Cart')
const ProductModel = mongoose.model('Product')

const getCart = async function(ctx, next) {
	const userId = ctx.session.user._id
	try {
		const res = await CartModel.findOne({ userId })
		// 获取商品
		const list = res.list
		const pids = list.map(item => item.id)
		const prds = await ProductModel.find({'subProds._id': {$in: pids}}).lean()
		const _list = []
		prds.forEach(prd => prd.subProds.forEach(sub => {
			const curtCart = list.find(citem => sub._id.toString() === citem.id)
			const {subProds, ...rest} = prd
			if (curtCart) {
				_list.push({
					...rest,
					...sub,
					num: curtCart.num
				})
			}

		}))
		ctx.body = ctx.createRes(200, _list)

	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)

	}
}

const updateCart = async function(ctx, next) {
	const {type, productId, num } = ctx.request.body
	const userId = ctx.session.user._id
	const cartObj = await CartModel.findOne({ userId }).lean()
	const cartListObj = cartObj.list
	const curtProduct = cartListObj.find(product => product.id === productId)
	const curtProductIdx = cartListObj.findIndex(product => product.id === productId)

	switch (type) {

		case 'plus':
			if (curtProduct) {
				curtProduct.num++

			} else {
				cartListObj.push({ id: productId, num: 1 })
			}
			break
		case 'minus':
			if (curtProduct.num <= 1) {

			} else {
				curtProduct.num--
			}
			break
		case 'delete':
			if (curtProductIdx >= 0) {
				cartListObj.splice(curtProductIdx, 1)
			} else {
				return ctx.body = ctx.createRes(401)
			}
			break
		case 'set':
			num = Math.ceil(num)
			if (num >= 0) {
				curtProduct.num = num
			} else {
				return ctx.body = ctx.createRes(401)
			}
			break
		default:
			return ctx.body = ctx.createRes(401)

	}
	try {

		const res = await CartModel.findOneAndUpdate({ userId }, { $set: { list: cartListObj } })
		ctx.body = ctx.createRes(200, res)

	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const addCart = async function(ctx, next) {
	const { productNums } = ctx.request.body
	const ids = Object.keys(productNums)
	const userId = ctx.session.user._id
	const cartObj = await CartModel.findOne({ userId }).lean()
	const cartList = cartObj.list
	// const curtProduct = cartListObj.filter(product => product.id)
	// const curtProductIdx = cartListObj.findIndex(product => product.id === productId)
	ids.forEach(id => {
		const num = parseInt(productNums[id]) || 0
		const curt  = cartList.find(item => item.id === id)
		if (curt) curt.num += num
		else {
			cartList.push({
				id,
				num
			})
		}
	})

	try {
		const res = await CartModel.findOneAndUpdate({ userId }, { $set: { list: cartList } })
		ctx.body = ctx.createRes(200, res)

	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.getCart = getCart
exports.updateCart = updateCart
exports.addCart = addCart
