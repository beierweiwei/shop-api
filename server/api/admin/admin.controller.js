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
			ctx.body = ctx.createRes(500)
		}
	}else {
		ctx.body = ctx.createRes(300)
	}
}

// 后台管理员登陆
// 
exports.adminLogin = async (ctx, next) => {
	const md5 = crypto.createHash('md5')
	const reqData = ctx.request.body
	// first username
	console.log(reqData)
	let user
  if (!reqData.validateCode || reqData.validateCode.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    return ctx.body = ctx.createRes(300, '验证码错误！')
  }
	if(reqData.username && reqData.password) {
		try {
			user = await Admin.findOne({username: reqData.username}, 'username password role permit').lean()
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
		if (user && user.password === md5.update(reqData.password + secrets).digest('hex')) {
			delete user.password
			ctx.session.admin = user
			return ctx.body = ctx.createRes(200, user)
		} else {
			ctx.body = ctx.createRes(300, '帐号或密码错误！')
		}
	}
	ctx.body = ctx.createRes(300, '帐号或密码错误！')
}

exports.adminRegist = async (ctx, next) => {
	const md5 = crypto.createHash('md5')
	if (ctx.session.admin.role < 100) return ctx.body = ctx.createRes(301)
	const data  = ctx.request.body
	if (data.username && data.password) {
		data.password = md5.update(data.password + secrets).digest('hex')
		try {
			res = await Admin.create(data)
			ctx.body = ctx.createRes(200)
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
	}else {
		ctx.body = ctx.createRes(300)
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


exports.info = async function (ctx, next) {
	let admin = ctx.session.admin 
	if (admin) {
		ctx.body = ctx.createRes(200, admin)
	}else {
		ctx.body = ctx.createRes(201)
	}
}