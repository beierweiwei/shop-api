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
	},
	isDef: {
		type: Number,
		required: true,
		default: 0
	},
	user: {
		 type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
	}
})

exports.AddressSchema = AddressSchema
module.exports = mongoose.model('Address', AddressSchema)