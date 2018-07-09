const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ProductPropSchema = new Schema({
	name: String,
	field: String,
	isMulit: Boolean,
	selector: [{
		type: String,
		unique: true
	}],
	sort: Number
})
const ProductProp = mongoose.model('ProductProp', ProductPropSchema)
exports.ProductPropSchema = ProductPropSchema
module.exports = ProductProp