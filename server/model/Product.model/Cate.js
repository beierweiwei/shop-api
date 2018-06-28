const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ProductCateSchema = new mongoose.Schema({
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
	},
	prodProps: [{
		type: Schema.Types.ObjectId
	}]
})
const ProductCate = mongoose.model('ProductCate', ProductCateSchema)
exports.ProductCateSchema = ProductCateSchema
module.exports = ProductCate