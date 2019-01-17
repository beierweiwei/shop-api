const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		max: 30
	},
	thumbPic: [{
		type: String,
		required: true
	}],
	des: {
		type: String,
		required: true,
		max: 50
	},
	// props : {propsId: {name: '', selector: ['xx', 'xxx']}}
	props: [],
	isSale: {
		type: Number,
		default: 1
	},
	stock: {
		type: Number,
		required: true
	},
	saleNum: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: true
	},
	mprice: {
		type: Number
	},
	detail: {
		type: String,
		required: true
	},
	unit: {
		// type: Schema.Types.ObjectId,
		// ref: 'ProductUnit'
		type: String,
		required: true
	},
	activities: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Activity'
		}
	],
	cateId: {
		type: Schema.Types.ObjectId,
		ref: 'ProductCate',
		required: true
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
			propItems: {
				type: String
			},
			price: {
				type: Number,
				required: true
			},
			stock: {
				type: Number,
				required: true
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