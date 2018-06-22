/**
 * 用户表
 */
'user static'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

let UserSchema = new Schema({
	nickname: {
		type: String,
		unique: true,
		require: true
	},
	sex: {
		type: Number,
		require: true
	},
	tel: {
		type: Number,
		unique: true
	},
	avatar: {
		type: String
	},
	openid: {
		type: String,
		unique: true
	},
	ctime: {
		type: Date,
		default: Date.now()
	},
	block: {
		type: Boolean,
		default: false
	},
	money: {
		type: Number,
		default: 0
	}
})

exports.UserSchema = UserSchema
module.exports = mongoose.model('User', UserSchema)

