const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const paySchema = new Schema({
	amount: {
		type: Number,
		require: true
	},
	order: {
		type: Schema.Types.ObjectId,
		require: true
	},
	user: {
		type: Schema.Types.ObjectId,
		require: true
	},
	ctime: {
		type: Date,
		require: true,
		default: Date.now 
	},
	ptime: { //支付时间
		type: Date,
	},
	platform: {
		type: Number,
		default: 0, // 0: 账号余额1:支付宝 2:微信 
	},
	shop: {
		type: Schema.Types.ObjectId
	}
})
exports.paySchema = paySchema
module.exports = mongoose.model('Pay', paySchema)