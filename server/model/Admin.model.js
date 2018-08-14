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
	role: {
		type: Number,
		require: true 
	},
	permit: [{
		type: String
	}]
})

const AdminModel = mongoose.model('Admin', AdminSchema)

exports.AdminSchema = AdminSchema
module.exports.AdminModel = AdminModel