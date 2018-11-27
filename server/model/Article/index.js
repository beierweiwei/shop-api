const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ArticleSchema = new Schema({
	title: String,
	content: String,
	author: String,
	views: {
		type: Number,
		default: 0
	},
	des: String,
	isPublic: {  // 1 public 0 private
		type: Number,
		default: 1 
	},
	cate: {
		type: Schema.Types.ObjectId,
		ref: 'ArticleCate'
	},
	ctime: {
		type: Date,
		default: Date.now
	},
	likeNum: {
		type: Number,
		default: 0
	},
	unlikeNum: {
		type: Number,
		default: 0
	},
	utime: Date
})

exports.ArticleSchema = ArticleSchema
module.Article = mongoose.model('Article', ArticleSchema)