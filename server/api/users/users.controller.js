const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.getUserList = async (ctx, next) => {
	if (!ctx.session.user) ctx.body = ctx.createRes(201)
	else { try {
		let count = await User.count()
		if (count > 0) {
			const userList = await User.find({}).exec()
			ctx.body = ctx.createRes(200, {list: userList, count, user: ctx.session.user})
		}
	}catch(err) {
		ctx.throw(err)
	}}
}
