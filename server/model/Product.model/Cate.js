const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ProductCateSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	field: {
		type: String,
		require: true,
		unique: true
	},
	title: String,
	sort: {
		type: Number,
		default: 0
	},
	ctime: {
		type: Date,
		default: Date.now
	},
	props: [{
		type: Schema.Types.ObjectId,
		ref: 'ProductProp'
	}],
	pid: [{
		type: Schema.Types.ObjectId,
	}],
	utime: {
		type: Date,
		default: Date.now
	}
})
const ProductCate = mongoose.model('ProductCate', ProductCateSchema)
exports.ProductCateSchema = ProductCateSchema
module.exports = ProductCate