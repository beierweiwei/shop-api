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
	isMulit: Number,
	selector: [{
		type: String,
		unique: true
	}],
	sort: Number,
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