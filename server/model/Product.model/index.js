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
		require: true,
		max: 50
	},
	props: [{
		type:  Schema.Types.ObjectId,
		ref: 'ProductProp',
		require: true
	}],
	isSale: {
		type: Number,
		default: 1
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
		type: String,
		require: true 
	},
	cateId: {
		type: Schema.Types.ObjectId,
		ref: 'ProductCate',
		require: true 
	},
	shopId: {
		type: String,
		default: 0
	},
	ctime: {
		type: Date,
		default: Date.now
	},
	utime: {
		type: Date,
		default: Date.now	
	},
	subProds: [
		{
			//_id: Schema.Types.ObjectId,
			propItems: String,
			price: {
				type: Number,
				require: true
			},
			stock: {
				type: Number,
				require: true 
			},
			saleNum: {
				type: Number,
				default: 0
			},
			isSale: {
				type: Number,
				default: 1
			},
			thumbPic: String,
			default: ''
		}
	]
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
		'unit': this.unit.value,
		'cateId': this.cateIid,
		'shopId': this.shopId,
		'ctime': this.ctime
	}})



	exports.ProductSchema = ProductSchema
	module.exports = mongoose.model('Product', ProductSchema)