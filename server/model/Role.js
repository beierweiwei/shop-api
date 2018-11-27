const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const permission = require('../config/contants')
const RoleSchema = new Schema({
	roleName: {
		type: String,
		unique: true,
		require: true 
	},
	block: {
		type: Number,
		default: 1
	},
	permission: {
		type: Object,
		require: true,
		default: permission
	},
	level: {
		type: Number,
		default: 3
	}
})

const RoleModel = mongoose.model('Role', RoleSchema)

exports.RoleSchema = RoleSchema
module.exports.RoleModel = RoleModel