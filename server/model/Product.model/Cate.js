const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductCateSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
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
	props: [{
		type: Schema.Types.ObjectId,
		ref: 'ProductProp'
	}],
	level: Number, // 分类级别，最多3级分类
	pid: {
		type: String,
	},
	utime: {
		type: Date,
		default: Date.now
	}
})
const ProductCate = mongoose.model('ProductCate', ProductCateSchema)
exports.ProductCateSchema = ProductCateSchema
module.exports = ProductCate