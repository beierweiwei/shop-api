const mongoose = require('mongoose')
const _ = require('lodash')
const ProductProp = mongoose.model('ProductProp')

const updateProductProp = async function (ctx, next) {
	let id = ctx.params.id
	id = id || 'add'
	const data = ctx.request.body 
	let result 
	try {
		if (id === 'add') {
			result = await ProductProp.create(data)
		}else {
			result = await ProductProp.findByIdAndUpdate(id, data, {new: true})
		}
	
		if (result) ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

// 可删除多个或一个
const removeProductProp = async function (ctx, next) {
	const id = ctx.request.body.id 
  const condition = _.isArray(id) ? {_id: {$in: id}} : {_id: id}
	let result 
	try {
		result = await ProductProp.remove(condition)
		if (result) ctx.body = ctx.createRes(200, result)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

// const updateProductProp = async function (ctx, next) {
// 	const id = ctx.params.id
// 	const data = ctx.request.body 
// 	let result 
// 	try {
// 		result = await ProductProp.findByIdAndUpdate(id, data, {new: true})
// 		if (result) ctx.body = ctx.createRes(200, result)
// 	} catch (err) {
// 		ctx.body = ctx.createRes(500, err.message)
// 	}
// }

const getProductProp = async function (ctx, next) {
	const id = ctx.params.id 
	let result 
	try {
		result = await ProductProp.findOne({_id: id})
		if (result) ctx.body = ctx.createRes(200, result)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
 const getProductPropList = async function (ctx, next) {
 	let result
 	let count
 	try {
 		result = await ProductProp.find()
 		count = await ProductProp.count()
 		if (result) ctx.body = ctx.createRes(200, result)
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
			res = await ProductProp.updateMany({_id: {$in: ids}}, modify)
		} else if (actionType === 'delete') {
			res = await ProductProp.remove({_id: {$in: ids}})
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
 exports.batchAction = batchAction
 exports.removeProductProp = removeProductProp
 exports.updateProductProp = updateProductProp
 exports.getProductProp = getProductProp
 exports.getProductPropList = getProductPropList