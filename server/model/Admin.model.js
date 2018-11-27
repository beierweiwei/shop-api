const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const AdminSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true 
	},
	password: {
		type: String,
		require: true 
	},
	tel: {
		type: Number
	},
	level: {
		type: Number,
		require: true,
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
	}
})

const AdminModel = mongoose.model('Admin', AdminSchema)

exports.AdminSchema = AdminSchema
module.exports.AdminModel = AdminModel