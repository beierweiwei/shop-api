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

exports.editAddress = async function (ctx, next) {
	// 编辑
	const id = ctx.params.id
	const areaCode = ctx.request.body.areaCode
	const name = ctx.request.body.name
	const tel = ctx.request.body.tel
	const detail = ctx.request.body.detail
	const isDef = ctx.request.body.isDef
	const areaName = areaCode.map((area) => area.name).join(',')

	// areaCode = JSON.parse(areaCode)
	try {
		// if (isDef === 1) await Address.updateMany({_id: ctx.params.id}, {isDef: 0})
		const address = await Address.findOneAndUpdate({_id: ctx.params.id}, {$set: {areaCode: areaCode, name: name, tel: tel,detail: detail, areaName: areaName}})
		ctx.body = ctx.createRes(200, address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getUserAddressList = async function (ctx, next) {

	let admin = ctx.session.admin
	let query = ctx.query
	let userId
	if (admin && query.userId) userId = query.userId
	else if (user) userId = user._id
	if (!userId) return ctx.body = ctx.createRes(401,  '缺少用户id')
	try {
		const result = await User.findOne({'_id': userId}).populate('address')
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
	try {
		res = await Address.find({user: userId})
		ctx.body = ctx.createRes(200, res)
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

exports.updateMyAddress = async function(ctx) {
	const userId = ctx.session.user._id
	const id = ctx.params.id
	const areaCode = ctx.request.body.areaCode
	const name = ctx.request.body.name
	const tel = ctx.request.body.tel
	const detail = ctx.request.body.detail
	const isDef = ctx.request.body.isDef
	const areaName = areaCode.map((area) => area.name).join(',')
	console.log('isDef', isDef)
	let addressDc, userDc
	// areaCode = JSON.parse(areaCode)
	try {
		if (isDef == 1) {
			await Address.updateMany({user: userId}, {isDef: 0})
		}
		userDc = await User.findOne({_id: userId}).lean()
		const address = await Address.findOneAndUpdate({_id: id, user: userId}, {$set: {areaCode: areaCode, name: name, tel: tel,detail: detail, areaName: areaName, isDef}})
		ctx.body = ctx.createRes(200, address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.createMyAddress = async function (ctx) {
	let userId = ctx.session.user._id
	let userDc, addressDc, res, addressCount
	const data = ctx.request.body
	try {
		userDc = await User.findOne({_id: userId})
		addressCount = await Address.count({user: userId})
		let address = new Address()
		address.tel = data.tel
		address.name = data.name
		address.areaCode = data.areaCode
		address.detail = data.detail
		address.areaName = data.areaCode.map(area => area.name).join(',')
		address.isDef = !addressCount ? 1 : 0
		address.user = userId
		let result = await address.save()
		userDc.address.push([address._id])
		await userDc.save()
		ctx.body = ctx.createRes(200, result)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.deleteMyAddress = async function (ctx) {

	const userId = ctx.session.user._id
	const id = ctx.params.id
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



