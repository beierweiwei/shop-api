const mongoose = require('mongoose')
const Address = mongoose.model('Address')
const AddressSchema = require('../../model/Address.model').AddressSchema
const User = mongoose.model('User')

exports.addAddress = async function (ctx, netx) {
	const data = ctx.request.body || {} 
	const user = ctx.session.user
	const admin = ctx.session.admin
	let userId
	if (admin && data.userId) userId = data.userId
	else if (user) userId = user._id
	else return ctx.body = ctx.createRes(401, '缺少用户id')
	try {
		let userDc = await User.findOne({_id: userId})
		if (!userDc) return ctx.body = ctx.createRes(401, '未找到用户')
		let address = new Address()
		address.tel = data.tel
		address.name = data.name
		address.areaCode = data.areaCode
		address.detail = data.detail
		address.areaName = data.areaCode.map(area => area.name).join(',')
		let result = await address.save()
   console.log(userDc)
		userDc.address.push([address._id])
		console.log(userDc)
		await userDc.save()
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.deleteAddress = async function (ctx, netx) {
	// 判断身份,是否是用户本人
	const data = ctx.request.body || {}
	const user = ctx.session.user
	const admin = ctx.session.admin
	const id = ctx.params.id
	let userId 
	if (admin && data.userId) userId = data.userId
	else if(user) userId = user._id
	else return ctx.body  = ctx.createRes(401, '缺少用户id')
	try {
		let result = await User.findOneAndUpdate(
			{_id: userId}, 
			{$pull: {address: id}}, 
		)
		result = await Address.findOneAndRemove({_id: id})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
		
	// } else {
	// 	ctx.body = ctx.createRes(501)
	// }
}

exports.editAddress = async function (ctx, netx) {
	// 编辑
	const id = ctx.params.id 
	const areaCode = ctx.request.body.areaCode
	console.log(areaCode)
	const name = ctx.request.body.name
	const tel = ctx.request.body.tel
	const detail = ctx.request.body.detail
	const areaName = areaCode.map((area) => area.name).join(',')
	// areaCode = JSON.parse(areaCode)
	try {
		const address = await Address.findOneAndUpdate({_id: ctx.params.id}, {$set: {areaCode: areaCode, name: name, tel: tel,detail: detail, areaName: areaName}}) 
		ctx.body = ctx.createRes(200, address)
	}catch(err) {
		ctx.body = ctx.createRes(501, err.message)
	}
}

exports.getUserAddressList = async function (ctx, next) {
	let user = ctx.session.user || {}
	let admin = ctx.session.admin
	let query = ctx.query
	let userId 
	if (admin && query.userId) userId = query.userId 
	else if (user) userId = user._id
	if (!userId) return ctx.body = ctx.createRes(401,  '缺少用户id') 
	try {
		const result = await User.findOne({'_id': userId}).populate('address')
		console.log(result)
		ctx.body = ctx.createRes(200, result && result.address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getAddress = async function (ctx, next) {
	const id = ctx.session.user._id  
	try {
		const result = await User.findOne({_id: id}).populate('address').lean()
		delete result.password 
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}


