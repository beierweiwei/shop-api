const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const paySchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	order: {
		type: Schema.Types.ObjectId,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true
	},
	ctime: {
		type: Date,
		required: true,
		default: Date.now 
	},
	ptime: { //支付时间
		type: Date,
	},
	platform: {
		type: Number,
		required: true,
		default: 0, // 0: 账号余额1:支付宝 2:微信 
	},
	shop: {
		type: Schema.Types.ObjectId
	}
})
exports.paySchema = paySchema
module.exports = mongoose.model('Pay', paySchema)