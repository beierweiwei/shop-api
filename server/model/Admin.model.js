const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	nickname: {
		type: String
	},
	avatar: {
		type: String,
		default: '/static/imgs/default_avatar.png'
	},
	tel: {
		type: Number,
		unique: true
	},
	mail: {
		type: String,
		unique: true
	},
	level: {
		type: Number,
		required: true,
		default: 2
	},
	block: {
		type: Number,
		default: 1
	},
	permission: [{
		type: Object
	}],
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role'
	},
	sex: {
		type: Number,
		default: 1
	}
})

const AdminModel = mongoose.model('Admin', AdminSchema)

exports.AdminSchema = AdminSchema
module.exports.AdminModel = AdminModel