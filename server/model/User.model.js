/**
 * 用户表
 */
'user static'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

let UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	sex: {
		type: Number,
		default: 0,
	},
	tel: {
		type: String,
		unique: true,
		require: true
	},
	avatar: {
		type: String
	},
	openid: {
		type: String,
	},
	ctime: {
		type: Date,
		default: Date.now
	},
	block: {
		type: Boolean,
		default: false
	},
	money: {
		type: Number,
		default: 0
	},
	address: [{
		type: Schema.Types.ObjectId,
		ref: 'Address'
	}],
	birth: {
		type: Date,
		default: Date.now
	},
	coupons: [{
		num: {
			type: Number,
			default: 1,
			required: true
		},
		type: {
		    type: Number,
		    default: 0, // 优惠券类型。1 平台通用券 2 活动优惠券
		},
		full: {
		  type: Number,
		   required: true
		},
		reduce: {
      type: Number,
      required: true
    },
		activity: [{
		    type: Schema.Types.ObjectId,
		    unique: true,
		    ref: 'Activity'
		}],
		startTime: {
		    type: Date,
		    required: true,
		},
		endTime: {
		    type: Date,
		    required: true
		},
		status: {
		  type: Number, // 1 可使用 2 已冻结 3 已使用 4 已过期
		  required: true,
		  default: 1
		}
	}]
}, {
	usePushEach: true
})

exports.UserSchema = UserSchema
module.exports = mongoose.model('User', UserSchema)

