const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		max: 30
	},
	thumbPic: {
		type: Array,
		require: true 
	},
	des: {
		type: String,
		require: true
	},
	prop: {
		// type: Schema.Types.ObjectId,
		// ref: 'ProductProps'
		type: String,
		require: true
	},
	isSale: {
		type: Boolean,
		default: true
	},
	stock: {
		type: Number,
		require: true
	},
	saleNum: {
		type: Number,
		default: 0
	},
	price: {
		type: String,
		require: true 
	},
	mprice: {
		type: String,
		require: true 
	},
	detail: {
		type: String,
		require: true 
	},
	unit: {
		// type: Schema.Types.ObjectId,
		// ref: 'ProductUnit'
		type: String
	},
	cateId: {
		// type: Schema.Types.ObjectId,
		// ref: 'ProdutCates'
		type: String,
	},
	shopId: {
		type: String,
		default: 0
	},
	ctime: {
		type: Date,
		default: Date.now
	}
})

ProductSchema
	.virtual('info')
	.get(() => {return{
		'_id': this._id,
		'title': this.title,
		'thumbPic': this.thumb.pic,
		'des': this.des,
		'prop': this.prop.value,
		'isSale': this.isSale,
		'stock': this.stock,
		'saleNum': this.saleNum,
		'price': this.price,
		'mprice': this.mprice,
		'detail': this.detail,
		'uniit': this.unit.value,
		'cateId': this.cateIid,
		'shopId': this.shopId,
		'ctime': this.ctime
	}})

	exports.ProductSchema = ProductSchema
	module.exports = mongoose.model('Product', ProductSchema)