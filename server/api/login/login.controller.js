const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.login = async (ctx, next) => {
	const reqData = ctx.request.body
	// first username
	let user
	if(reqData.username && reqData.password) {
		try {
			user = await User.findOne({username: reqData.username}, 'username password tel sex').lean()
			console.log('user',user)
		}catch(err) {
			console.log(err)
			ctx.body = ctx.createRes(300, err.message)
		}
		if (user && user.password === reqData.password) {
			ctx.session.user = user

			delete user.password
			return ctx.body = ctx.createRes(200, user)
		}
	}
	ctx.body = ctx.createRes(300)
}

exports.register = async (ctx, next) => {
	const data  = ctx.request.body
	if (data.username && data.password) {
		try {
			res = await User.create(data)
			ctx.session.user = res
			ctx.body = ctx.createRes(200)
		}catch(err) {
			ctx.throw(err)
		}
	}else {
		ctx.body = ctx.createRes(300)
	}
}