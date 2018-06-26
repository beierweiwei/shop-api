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
	AreaCode:[{
		type: Schema.Types.ObjectId,
		ref: 'Area'
	}],
	detail: String
}) 

exports.AddressSchema = AddressSchema
module.exports = mongoose.model('Address', AddressSchema)