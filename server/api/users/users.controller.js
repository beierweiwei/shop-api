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
	const admin = ctx.session.admin
	const user = ctx.session.user
	if (user && !admin) {
		if (id != user._id.toString()) {
			ctx.body = ctx.createRes(404)
		}
	}
	if (!id) ctx.body = ctx.createRes(500)
	try {
		let result = await User.findOne({_id: id}).select('username tel sex birth address money')
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500,err.message)
	}
}

//批量操作接口
exports.updateUser = async function (ctx) {
	const data = ctx.request.body
	const accessKeys = ['tel', 'sex', 'birth', 'money', 'block']
	let id = data.id
	id = typeof id === 'string' ? [id] : id
	id = [...id]
	delete data.id 
	let tempData = {}
	Object.keys(data).filter(key => ~accessKeys.indexOf(key) && data[key] !== undefined).forEach(key => tempData[key] = data[key])
	try {
		const result = await User.updateMany({_id: {$in: id}}, {
			$set: tempData
		})
		ctx.body = ctx.createRes(200, result)

	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.deleteUser = async function (ctx) {
	const data = ctx.request.body 
	let id = data.id
	id = typeof id === 'string' ? [id] : id
	try {
		let res = await User.remove({_id: {$in: id}})
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
// user
exports.getMe = async function (ctx) {
	let user = ctx.session.user || {}
	let id = user._id 
	let res 
	try {
		res = await User.findOne({_id: id}).select('-password')
		res = res || {}
	} catch (err) {
		ctx.body = ctx.createRes(500)
	}
	ctx.body = ctx.createRes(200, {data: res})
}

exports.updateMe = async function (ctx) {
	let user = ctx.session.user || {}
	let id = user._id
	let data = ctx.request.body
	let res 
	['money', 'username', 'block'].forEach(path => {
		if (data[path]) delete data[path]
	})
	try {
		res = await User.findOneAndUpdate({_id: id}, {$set: data})
	} catch (err) {
		ctx.body = ctx.createRes(500)
	}
	ctx.body = ctx.createRes(200, {data: res})
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

