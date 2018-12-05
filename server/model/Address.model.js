const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
	tel: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true 
	},
	areaCode:{
		type: Array,
		required: true
	},
	areaName: {
		type: String,
		required: true
	},
	detail: {
		type: String,
		required: true
	}
}) 

exports.AddressSchema = AddressSchema
module.exports = mongoose.model('Address', AddressSchema)