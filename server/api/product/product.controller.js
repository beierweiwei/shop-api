const mongoose = require('mongoose')
const escapeSearch = require('../../util/escape')
const Product = mongoose.model('Product')
const ProductProp = mongoose.model('ProductProp')
const ProductCate = mongoose.model('ProductCate')
const editProduct = async (ctx, next) => {
	const data =  ctx.request.body
	let productId = ctx.params.id
	let result
	productId = productId || 'add'

	try {
		if(productId !== 'add') {
			let saleNum = 0
			let stock = 0
			data.subProds = data.subProds || []
			if (data.subProds.length >>> 0) {
				data.subProds.forEach(sub => {
					saleNum += Number(sub.saleNum)
					// console.log(typeof sub.stock, sub.stock, typeof sub.saleNum, sub.saleNum)
					stock += Number(sub.stock) 
				})
				data.saleNum = saleNum
				data.stock = stock
			}
			result = await Product.findOneAndUpdate({_id: productId}, {$set: data})

		}else {
			result = await Product.create(data)
		}
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const getProductById = async function (ctx) {
 const id = ctx.params.id
 let result 
 if (!id) ctx.body = ctx.create(500)
	try{
		result = await Product.findOne({'_id': id}).populate('cateId props')
		if (result) ctx.body = ctx.createRes(200, result)
		else ctx.body = ctx.createRes(502)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

const getProductList = async function (ctx) {
	const query = ctx.query
	let {pageNum , pageSize = 10, curtPage, sort = '' } = query
	curtPage = curtPage || pageNum || 1 
	curtPage = parseInt(curtPage) > 0 ?  parseInt(curtPage) : 1
	pageSize  = parseInt(pageSize)
	pageSize = pageSize > 0 ? pageSize : 10
	//先查所有
	try {
		let count = await Product.count()
		let result = await Product.find().populate({path: 'cateId', select: "_id name",  options: {sort: {sort: '1'}}}).populate('props').sort(sort).skip((curtPage - 1) * pageSize).limit(pageSize).lean()
		ctx.body = ctx.createRes(200, {list: result, count: count, curtPage, pageSize})
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const deleteProduct = async function (ctx) {
	const productId = ctx.params.id
	const data = ctx.request.body 
	if (!productId) ctx.body = ctx.createRes(401)
	try {
		const res  = await Product.findOneAndRemove({_id: productId})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

//批量操作接口
const batchAction = async function (ctx) {
	const data = ctx.request.body 
	const actionType = data.actionType
	const actionField = data.actionField
	const actionValue = data.actionValue
	let res 
	let ids = data.ids
	ids = Array.isArray(ids) ? ids : []
	try {
		if (actionType === 'edit') {
			const modify = {}
			modify[actionField] = actionValue
			res = await Product.updateMany({_id: {$in: ids}}, modify)
		} else if (actionType === 'delete') {
			res = await Product.remove({_id: {$in: ids}})
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const search = async function (ctx, next) {
	let query = ctx.request.query 
	let { searchText = '',  pageSize = 10, pageNum = 1, cateId} = query
	searchText = escapeSearch(searchText)
	pageSize = parseInt(pageSize)
	pageNum = parseInt(pageNum)
	let reg = new RegExp(searchText, 'i')
	let queryOpts = {
		$or: [
			{title: {$regex: reg}},
			{desc: {$regex: reg}},
			{detail: {$regex: reg}},
			{$where: `this._id.toString().indexOf('${searchText}') !== -1`}
		]
	}
	if (cateId) queryOpts.cateId = cateId
	try {
		let count = await Product.count(queryOpts)
		let res = await Product.find(queryOpts, {}, {
			skip: (pageNum - 1) * pageSize,
			limit: pageSize
		}).populate('props').populate('cateId')
		ctx.body = ctx.createRes(200, {list: res, count})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

// 根据商品分类获取商品属性



// const removeProductCates = async () {}
// const removeProductProp = asynce () {}
exports.batchAction = batchAction
exports.editProduct = editProduct
exports.getProductById = getProductById
exports.getProductList = getProductList
exports.deleteProduct = deleteProduct
exports.search = search