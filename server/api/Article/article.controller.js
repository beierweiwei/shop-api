const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const { isArray } = require('lodash')
exports.getList = async (ctx, next) => {
	let pageSize = ctx.request.query.pageSize || 10 
	let curtPage = ctx.request.query.curtPage || 1
	pageSize = Number(pageSize)
	curtPage = Number(curtPage)
	try {
		let count = await Article.count()
		let res = await Article.find().populate('cate').skip(pageSize * (curtPage - 1)).limit(pageSize)
		return ctx.body = ctx.createRes(200, {count, list: res})
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getOne = async (ctx, next) => {
	const id = ctx.params.id
	let res
	try {
		await Article.findOneAndUpdate({_id: id}, {$inc: {views: 1}})
	} catch (err) {
		
	}
	try {
		res = await Article.findOne({_id: id}).populate('ArticalCate')
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.update = async (ctx, next) => {
	let data = ctx.request.body
	let id = data.id
	delete data.id
	let res 
	try {
		if (id && id === 'add') {
			res = await Article.create(data)
		} else {
			res = await Article.findOneAndUpdate({_id: id}, {$set: data})
		}
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

exports.delete = async (ctx, netx) => {
	let id = ctx.request.body.id
	let data = ctx.request.body 
	let res 
	delete data.id
	if (!Array.isArray(id)) id = [id]
	try {
		res = await Article.remove({_id: {$in: id}})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

