const mongoose = require('mongoose')
const Address = mongoose.model('Address')
const AddressSchema = require('../../model/Address.model').AddressSchema
const User = mongoose.model('User')

exports.createAddress = async function (ctx, netx) {
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
		userDc.address.push([address._id])
		await userDc.save()
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}
exports.deleteAddress = async function (ctx, netx) {
	// 判断身份,是否是用户本人
	const data = ctx.request.body || {}
	const id = data.id 
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
}

exports.editAddress = async function (ctx, netx) {
	// 编辑
	const id = ctx.params.id 
	const areaCode = ctx.request.body.areaCode
	const name = ctx.request.body.name
	const tel = ctx.request.body.tel
	const detail = ctx.request.body.detail
	const areaName = areaCode.map((area) => area.name).join(',')
	// areaCode = JSON.parse(areaCode)
	try {
		const address = await Address.findOneAndUpdate({_id: ctx.params.id}, {$set: {areaCode: areaCode, name: name, tel: tel,detail: detail, areaName: areaName}}) 
		ctx.body = ctx.createRes(200, address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
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
	const id = ctx.params.id  
	try {
		const result = await Address.findOne({_id: id})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

// 前台
// 
exports.getMyAddressList = async function (ctx, next) {
	const userId= ctx.session.user._id 
	const addressId = ctx.params.id 
	try {
		let result = User.findOne({_id: userId}).populate('address').select('address')
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getMyAddress = async function (ctx) {
	let addressId = ctx.params.id 
	let userId = ctx.session.user
	let res, addressList
	try {
		user = await User.findOne({_id: userId}).populate({path: 'address', match: {_id: addressId}}).select('address')
		res = user.address[0]
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.updateMyAddress = async function() {
	const userId = ctx.session.user._id
	const id = ctx.request.body.id
	const areaCode = ctx.request.body.areaCode
	const name = ctx.request.body.name
	const tel = ctx.request.body.tel
	const detail = ctx.request.body.detail
	const areaName = areaCode.map((area) => area.name).join(',')
	let addressDc, userDc 
	// areaCode = JSON.parse(areaCode)
	try {
		userDc = await User.findOne({_id: userId}).lean()
		if (!~userDc.address.indexOf(id)) ctx.createRes(404)
		const address = await Address.findOneAndUpdate({_id: id}, {$set: {areaCode: areaCode, name: name, tel: tel,detail: detail, areaName: areaName}}) 
		ctx.body = ctx.createRes(200, address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.createMyAddress = async function (ctx) {
	let userId = ctx.session.user._id 
	let userDc, addressDc, res
	try {
		userDc = await User.findOne({_id: id})
		let address = new Address()
		address.tel = data.tel
		address.name = data.name
		address.areaCode = data.areaCode
		address.detail = data.detail
		address.areaName = data.areaCode.map(area => area.name).join(',')
		let result = await address.save()
		userDc.address.push([address._id])
		res = await userDc.save()
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.deleteMyAddress = async function (ctx) {
	const userId = ctx.session.user._id 
	const id = ctx.request.body.id 
	let res 
	try {
		let result = await User.findOneAndUpdate(
			{_id: userId}, 
			{$pull: {address: id}}, 
		)
		res = await Address.findOneAndRemove({_id: id})
		ctx.body = ctx.createRes(200, res)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}



