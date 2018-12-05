const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const PostSchema = new Schema({
	_id: {
		type: String,//地区（省份）编码
		default: 0,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	company: [{
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			default: 0,
			required: true
		},
		increacePrice: {
			type: Number,
			default: 0
		}
	}],
	default: {
		type: Number,
		default: 0,
		required: true
	},
	status: {
		type: Number,
		default: 0,
		required: true
	}
})
exports.PostAge = PostSchema
module.exports = mongoose.model('Postage', PostSchema)