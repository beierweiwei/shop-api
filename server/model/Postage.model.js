const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const PostSchema = new Schema({
	_id: {
		type: String,//地区（省份）编码
		default: 0
	},
	name: String,
	company: [{
		name: String,
		price: Number,
		increacePrice: Number
	}],
	default: {
		type: Number,
		default: 0
	},
	status: {
		type: Number,
		default: 0
	}
})
exports.PostAge = PostSchema
module.exports = mongoose.model('Postage', PostSchema)