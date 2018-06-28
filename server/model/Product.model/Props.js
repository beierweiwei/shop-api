const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ProductPropsSchema = new Schema({
	name: String,
	isMulit: Boolean,
	selector: [{
		type: String,
		unique: true
	}]
})

const ProductProps = mongoose.model('ProductProps', ProductPropsSchema)

exports.ProductPropsSchema = ProductPropsSchema
module.exports = ProductProps