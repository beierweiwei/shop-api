const mongoose = require('mongoose')
const User = mongoose.model('User')
const crypto = require('crypto')
const escapeSearch = require('../../util/escape')
const { secrets } = require('../../config/env/')

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


// 前台用户
// 前台用户登陆
exports.login = async (ctx, next) => {
	const md5 = crypto.createHash('md5')
	const reqData = ctx.request.body
	// first username
	let user
	if(reqData.username && reqData.password) {
		try {
			
			user = await User.findOne({username: reqData.username}, 'username password tel sex').lean()
		}catch(err) {
			console.log(err)
			ctx.body = ctx.createRes(300, err.message)
		}
		if (user && user.password === md5.update(reqData.password + secrets).digest('hex')) {
			ctx.session.user = user
			delete user.password
			return ctx.body = ctx.createRes(200, user)
		}else {
			ctx.createRes(300)
		}
	}
	ctx.body = ctx.createRes(300)
}

exports.regist = async (ctx, next) => {
	const data  = ctx.request.body
	const md5 = crypto.createHash('md5')
	if (data.username && data.password) {
		data.password = md5.update(data.password + secrets).digest('hex')
		try {
			res = await User.create(data)
			ctx.session.user = res
			ctx.body = ctx.createRes(200)
		}catch(err) {
			ctx.body = ctx.createRes(err.message)
		}
	}else {
		ctx.body = ctx.createRes(300)
	}
}

exports.search = async function (ctx, next) {
	let query = ctx.request.query 
	let { searchText = '',  pageSize = 10, pageNum = 1} = query
	searchText = escapeSearch(searchText)
	pageSize = parseInt(pageSize)
	pageNum = parseInt(pageNum)
	let reg = new RegExp(searchText, 'i')
	let queryOpts = {
		$or: [
			{username: {$regex: reg}},
			{tel: {$regex: reg}},
			{detail: {$regex: reg}},
			{$where: `this._id.toString().indexOf('${searchText}') !== -1`}
		]
	}
	console.log(searchText)
	try {
		let count = await User.count(queryOpts)
		let res = await User.find(queryOpts, {}, {
			skip: (pageNum - 1) * pageSize,
			limit: pageSize
		})
		ctx.body = ctx.createRes(200, {list: res, count})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
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

