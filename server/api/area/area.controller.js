const mongoose = require('mongoose')
const Area = mongoose.model('Area')

const getAreaListById = async function (ctx, netx) {
	// 如果没有编码就默认查省级别list
	let id = Number(ctx.params.code) || '100000'
	try {
		let result = await Area.findOne({_id: id}, {__v: 0})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getAreaListById = getAreaListById