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
	}]
})

exports.UserSchema = UserSchema
module.exports = mongoose.model('User', UserSchema)

