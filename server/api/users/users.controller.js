const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.getUserList = async (ctx, next) => {
	if (!ctx.session.admin) return ctx.body = ctx.createRes(201)
	let count
 	let query = ctx.query
 	let sort = ctx.sort
 	let pageNum = parseInt(query.pageNum)
	let pageSize  = parseInt(query.pageSize)
	pageNum = pageNum && pageNum > 0 ? pageNum : 1
	pageSize = pageSize && pageSize > 0 ? pageSize : 10
	try {
		const count = await User.count()
		const userList = await User.find().sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize)
		ctx.body = ctx.createRes(200, {list: userList, count, pageSize, pageNum, count})
		
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getUser = async function (ctx, next) {
	const id = ctx.params.id 
	if (!id) ctx.body = ctx.createRes(501)
	try {
		let result = await User.findOne({_id: id}).select('username tel sex birth address money')
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500,err.message)
	}
}

exports.updateUser = async function (ctx, netx) {
	const userId = ctx.params.id 
	const data = ctx.request.body
	const accessKeys = ['tel', 'sex', 'birth', 'money', 'block']
	let tempData = {}
	Object.keys(data).filter(key => ~accessKeys.indexOf(key) && data[key] !== undefined).forEach(key => tempData[key] = data[key])
	try {
		console.log(tempData.birth)
		const result = await User.findOneAndUpdate({_id: userId}, {
			$set: tempData
		})
		ctx.body = ctx.createRes(200, result)

	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

//批量操作接口
exports.updateUsers = async function (ctx) {
	const data = ctx.request.body 
	const modify = data.modify
	let res 
	let ids = data.ids
	ids = Array.isArray(ids) ? ids : []
	try {
		res = await User.updateMany({_id: {$in: ids}}, {$set: modify})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.deleteUsers = async function (ctx) {
	const data = ctx.request.body 
	const ids = data.ids
	if (!ids) return ctx.body = ctx.createRes(401)
	ids = Array.isArray(ids) || [ids.toString()]
	try {
		let res = await User.remove({_id: {$in: ids}})
		ctx.body = ctx.createRes(200)
	} catch (err) {
		ctx.body = ctx.createRes(501, err.message)
	}
}

// // 关于收货地址
// exports.addAddress = async function (ctx, netx) {
	
// 	ctx.body = ctx.createRes(200)
// }

// //多条
// exports.deleteAddress = async function (ctx, netx) {
// 	//
// 	ctx.body = ctx.createRes(200)
// }

// exports.editAddress = async function (ctx, netx) {
// 	//
// 	ctx.body = ctx.createRes(200)
// }

// exports.getAddressList = async function () {
	
// }

// exports.getAddress = async function (ctx, next) {
// 	const id = ctx.params.id 
// 	Address.findOne('_id': id)
// }

