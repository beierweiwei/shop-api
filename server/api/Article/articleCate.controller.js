const mongoose = require('mongoose')
const ArticleCate = mongoose.model('ArticleCate')
const { isArray } = require('lodash')
exports.getList = async (ctx, next) => {
	const body = ctx.request.body
	const reqConf = body.reqConf || {}
	const pageSize = reqConf.size || 10 
	const curtPage = reqConf.curtPage || 1
	try {
		let res = await ArticleCate.find()
		let count = await ArticleCate.count()
		return ctx.body = ctx.createRes(200, {count, list: res})
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getOne = async (ctx, next) => {
	const id = ctx.params.id
	let res 
	try {
		res = await ArticleCate.findOne({_id: id})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.update = async (ctx, next) => {
	let data = ctx.request.body
	let id = data.id
	let res 
	try {
		if (id && id === 'add') {
			res = await ArticleCate.create(data)
		} else {
			if (typeof id == 'string' ) id = [id]
			res = await ArticleCate.updateMany({_id: {$in: id}}, {$set: data})
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

exports.delete = async (ctx, netx) => {
	let id = ctx.request.body.id
	if (!isArray(id)) id = [id]
	let data = ctx.request.body
	let res 
	try {
		res = await ArticleCate.remove({_id: {$in: id}})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

