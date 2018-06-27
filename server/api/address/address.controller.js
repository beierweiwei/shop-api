const mongoose = require('mongoose')
const Address = mongoose.model('Address')
const AddressSchema = require('../../model/Address.model').AddressSchema
const User = mongoose.model('User')

exports.addAddress = async function (ctx, netx) {
	const data = ctx.request.body 
	const user = ctx.session.user
	user.address = user.address || []
	try {
		let address = new Address()
		address.tel = data.tel
		address.name = data.name
		address.areaCode = data.areaCode
		address.detail = data.detail
		address.areaName = data.areaCode.map(area => area.name).join(',')
		let result = await address.save()

		if(user.address.length >= 2) {
			ctx.body = ctx.createRes(500)
		}
		result = await User.findOneAndUpdate({_id: user._id}, {$push: {address: address._id}})
	  result = await User.findOne({_id: user._id})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}

}


exports.deleteAddress = async function (ctx, netx) {
	// 判断身份,是否是用户本人
	
	const data = ctx.request.body
	const id = ctx.params._id
	const user = ctx.session.user

	if (user._id.toString() === data.userId) {
		try {
			const result = await User.findOneAndUpdate(
				{_id: user._id}, 
				{$unset: {"address.$[ttt]": ''}}, 
				{arrayFilters: [{ttt: {$eq: id}}]}
			)
			ctx.body = ctx.createRes(200, result)
		}catch(err) {
			ctx.body = ctx.createRes(500, err.message)
		}
		
	} else {
		ctx.body = ctx.createRes(501)
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
		ctx.body = ctx.createRes(501, err.message)
	}
}

exports.getUserAddressList = async function (ctx, next) {
	const user = ctx.session.user
	try {
		const result = await User.findOne({'_id': user._id}).populate('address').exec()
		ctx.body = ctx.createRes(200, result.address)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getAddress = async function (ctx, next) {
	const id = ctx.params.id  
	try {
		const result = await Address.findOne({'_id': id})
		ctx.body = ctx.createRes(200, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}


