const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.getUserList = async (ctx, next) => {
	if (!ctx.session.user) {
		ctx.body = ctx.createRes(201)
	} else { 
		try {
			let count = await User.count()
			if (count > 0) {
				const userList = await User.find().exec()
				ctx.body = ctx.createRes(200, {list: userList, count, user: ctx.session.user})
			}
		}catch(err) {
			ctx.throw(err)
		}
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

