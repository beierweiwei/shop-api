const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
	tel: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true 
	},
	areaCode:[],
	areaName: {
		type: String,
		require: true
	},
	detail: {
		type: String,
		require: true
	}
}) 

exports.AddressSchema = AddressSchema
module.exports = mongoose.model('Address', AddressSchema)