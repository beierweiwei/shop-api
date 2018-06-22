const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.getUserList = async (ctx, next) => {
	try {
		let count = await User.count()
		console.log(count)
		if (count > 0) {
			const userList = await User.find({}).exec()
			ctx.status = 200
			ctx.body = {
				data: userList,
				count: count
			}
			
		}
	}catch(err) {
		console.log(err)
		ctx.throw(err)
	}
	
}