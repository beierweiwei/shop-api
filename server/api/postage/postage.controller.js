const mongoose = require('mongoose')
const Postage = mongoose.model('Postage')

exports.getPosagetList = async function (ctx, netx) {
	// 如果没有编码就默认查省级别list
	try {
		let result = await Postage.find()
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getPosage = async function (ctx, netx) {
	const id = ctx.params.id 
	try {
		let result = await Postage.findOne({_id: id})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.updatePostageById = async function (ctx, next) {
	const data = ctx.request.body
	const id = data._id 
	try {
		let res = await Postage.findOneAndUpdate({_id: id}, {$set: data})
		ctx.body = ctx.createRes(200, res)
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}

}

const updatePostages = async function (ctx, next) {
	
}

exports.deletePostages = async function (ctx, next) {
	const ids = ctx.body.ids 
	let res 
	try {
		res = await Postage.findAndDelete({_id: {$in: ids}})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.createPostage = async function (ctx, next) {
	const postageData = ctx.requset.body
	let res 
	try {
		res = await Postage.create(postage)
		ctx.body = ctx.createRes(200, res)
	}catch(err) {
		ctx.body = ctx.createRes(500, res.message)
	}
	
}
