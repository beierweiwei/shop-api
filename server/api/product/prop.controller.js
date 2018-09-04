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
 	let query = ctx.query
 	let sort = ctx.sort
 	let pageNum = parseInt(query.pageNum)
	let pageSize  = parseInt(query.pageSize)
	pageNum = pageNum && pageNum > 0 ? pageNum : 1
	pageSize = pageSize && pageSize > 0 ? pageSize : 10
 	try {
 		result = await ProductProp.find().sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize)
 		count = await ProductProp.count()
 		if (result) ctx.body = ctx.createRes(200, {list: result, pageSize, pageNum, count})
 	} catch (err) {
 		ctx.body = ctx.createRes(500, err.message)
 	}
 }
 exports.removeProductProp = removeProductProp
 exports.updateProductProp = updateProductProp
 exports.getProductProp = getProductProp
 exports.getProductPropList = getProductPropList