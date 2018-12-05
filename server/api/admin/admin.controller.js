const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')
const User = mongoose.model('User')
const crypto = require('crypto')
const svgCaptcha = require('svg-captcha')
const { secrets } = require('../../config/env/')
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
			ctx.body = ctx.createRes(401, err.message)
		}
		if (user && user.password === md5.update(reqData.password + secrets).digest('hex')) {
			ctx.session.user = user
			delete user.password
			return ctx.body = ctx.createRes(200, user)
		}else {
			ctx.createRes(401)
		}
	}
	ctx.body = ctx.createRes(401)
}

exports.regist = async (ctx, next) => {
	const data  = ctx.request.body
	const md5 = crypto.createHash('md5')
	if (data.username && data.password) {
		data.password = md5.update(data.password + secrets).digest('hex')
		try {
			res = await User.create(data)
			ctx.body = ctx.createRes(200, res)
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
	}else {
		ctx.body = ctx.createRes(401)
	}
}

// 后台管理员登陆
// 
exports.adminLogin = async (ctx, next) => {
	const md5 = crypto.createHash('md5')
	const reqData = ctx.request.body
	// first username
	let user
  if (!reqData.validateCode || reqData.validateCode.trim().toLowerCase() !== ctx.session.captcha.trim().toLowerCase()) {
    return ctx.body = ctx.createRes(401, '验证码错误')
  }
	if(reqData.username && reqData.password) {
		try {
			user = await Admin.findOne({username: reqData.username}, 'username password  level').lean()
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
		if (user && user.password === md5.update(reqData.password + secrets).digest('hex')) {
			delete user.password
			ctx.session.admin = user
			return ctx.body = ctx.createRes(200, user)
		}
	}
	ctx.body = ctx.createRes(401)
}

exports.adminRegist = async (ctx, next) => {
	const md5 = crypto.createHash('md5')
	if (ctx.session.admin.role < 100) return ctx.body = ctx.createRes(301)
	const data  = ctx.request.body
	if (data.username && data.password) {
		data.password = md5.update(data.password + secrets).digest('hex')
		try {
			res = await Admin.create(data)
			ctx.body = ctx.createRes(200, res)
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
	}else {
		ctx.body = ctx.createRes(401)
	}
}
exports.crateValidateCode = async (ctx, next) => {
  let ary = svgCaptcha.create();
  let txt = ary.text
  let buf = ary.data
  ctx.type = 'svg'
  ctx.session.captcha = txt 
  ctx.body = buf 
}

exports.getList = async function (ctx, next) {
	let { pageSize = 10, curtPage = 1} = ctx.request.query
	pageSize = parseInt(pageSize) || 10 
	curtPage = parseInt(curtPage) || 1
	let level = ctx.session.admin.level
	let res 
	let count
	try {
		count = await Admin.count({level: {$gt: level}})
		res = await Admin.find({level : {$gt: level}}).populate('role').select('-password').skip(pageSize * (curtPage -1)).limit(pageSize)
		ctx.body = ctx.createRes(200, { count, list: res})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getOne = async function (ctx, next) {
	let id = ctx.params.id 
	let res 
	try {
		res = await Admin.findOne({_id: id}).select('-password')
	} catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	ctx.body = ctx.createRes(200, {data: res})
}

exports.update = async function (ctx, next) {
	let data = ctx.request.body
	let id = data.id 
	let res 
	if (typeof id === 'string') {
		id = [id]
		if (data.password) {
			let md5 = crypto.createHash('md5')
			data.password = md5.update(data.password + secrets).digest('hex')
		}
	}
	else id = [...id]
	delete data.id 
	try {
		res = await Admin.updateMany ({_id: {$in: id}}, {$set: data})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	ctx.body = ctx.createRes(200, res)
}

exports.delete = async function (ctx, next) {
	let id = ctx.request.body.id 
	let res 

	if (typeof id === 'string') id = [id]
	try {
		res = await Admin.remove({_id: {$in: id}})
	}	catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	ctx.body = ctx.createRes(200, res)
}

exports.getInfo = async function (ctx) {
	let admin = ctx.session.admin
	let res 
	try {
		res = await Admin.findOne({_id: admin._id}).select('-password')
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, res.message)
	}
}

async function validateLevel (ids, level, ctx) {
	let adminList = await find({_id: {$in: ids}})
	let res = adminList.every(admin => {
		admin.level > level
	})
	if (!res) ctx.body = ctx.createRes(501)
}

// exports.validateCode = async (ctx, netx) => {
//
// }

exports.info = async function (ctx, next) {
	let admin = ctx.session.admin 
	if (admin) {
		ctx.body = ctx.createRes(200, admin)
	}else {
		ctx.body = ctx.createRes(201)
	}
}
