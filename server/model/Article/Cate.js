const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ArticleCateSchema = new mongoose.Schema({
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
	utime: {
		type: Date,
		default: Date.now
	}
})
const ArticleCate = mongoose.model('ArticleCate', ArticleCateSchema)
exports.ArticleCateSchema = ArticleCateSchema
module.exports = ArticleCate