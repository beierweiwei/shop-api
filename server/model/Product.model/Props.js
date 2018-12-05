const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ProductPropSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	field: {
		type: String,
		unique: true
	},
	isMulit: { //是否多选： 0 否 1是
		type: Number,
		default: 0
	},
	selector: [{
		type: String,
		unique: true
	}],
	sort: {
		type: Number,
		default: 0
	},
	ctime: {
		type: Date,
		default: Date.now
	},
	utime: {
		type: Date,
		default: Date.now
	}
})
const ProductProp = mongoose.model('ProductProp', ProductPropSchema)
exports.ProductPropSchema = ProductPropSchema
module.exports = ProductProp