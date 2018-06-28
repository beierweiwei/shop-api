const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ProductcateSchema = new Schema({
	name: {
		type: String,
		require: true 
	},
	field: {
		type: String,
		require: true
	},
	sort: {
		type: Number,
		default: 0
	},
	ctime: {
		type: Date,
		default: Date.now
	}，
	prodProps: [Schema.Types.ObjectId]
})
const Productcate = mongoose.model('Productcate', ProductcateSchema)
exports.ProductcateSchema = ProductcateSchema
module.exports = Productcate