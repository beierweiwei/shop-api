const mongoose = require('mongoose')
const _ = require('lodash')

const ProductCate = mongoose.model('ProductCate')

const addProductCate = async function (ctx, next) {
	let id = ctx.params.id 
	let data = ctx.request.body 
	let result
	if (!(data.prodProps && data.prodProps.length <= 0)) delete data.prodProps
	try {
		if (id === 'add') {
			result = await ProductCate.create(data)
		}else {
			result = await ProductCate.findOneAndUpdate({_id: id}, {$set: {
				name: data.name,
				field: data.field,
				title: data.title,
				sort: data.sort,
				pid: data.pid,
				props: data.props,
				uTime: Date.now
			}}, {new: true})
		}
		if(result) ctx.body = ctx.createRes(200, result)
	} catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const getProductCate = async function (ctx, next) {
	const id = ctx.params.id 
	let result 
	try {
		result = await ProductCate.findOne({_id: id}).populate('props')
		if (result) ctx.body = ctx.createRes(200, result)
	} catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const getProductCateList = async function (ctx, next) {
	try {
		const result = await ProductCate.find().populate('props', 'name')

		if (result) {
			ctx.body = ctx.createRes(200, result)
		}
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const updateProductCate = async function (ctx, next) {
	const id = ctx.params.id 
	const data = ctx.request.body
	let result
	try {
		result = await ProductCate.findOneAndUpdate({_id: id}, data, {new: true})
		ctx.body = ctx.createRes(200, result)

	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const removeProductCate = async function (ctx, next) {
	const id = ctx.request.body.id
	const condition = _.isArray(id) ? {_id: {$in: id}} : {_id: id}
	let result 
	try {
		result = await ProductCate.remove(condition)
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
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
			res = await ProductCate.updateMany({_id: {$in: ids}}, modify)
		} else if (actionType === 'delete') {
			res = await ProductCate.remove({_id: {$in: ids}})
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.addProductCate = addProductCate
exports.getProductCate = getProductCate 
exports.getProductCateList = getProductCateList
exports.updateProductCate = updateProductCate
exports.removeProductCate = removeProductCate
exports.batchAction = batchAction