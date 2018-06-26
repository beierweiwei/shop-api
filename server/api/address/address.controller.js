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

//多条
exports.deleteAddress = async function (ctx, netx) {
	//
	ctx.body = ctx.createRes(200)
}

exports.editAddress = async function (ctx, netx) {
	//
	ctx.body = ctx.createRes(200)
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


