const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ProductProp = mongoose.model('ProductProp')
const ProductCate = mongoose.model('ProductCate')
const editProduct = async (ctx, next) => {
	const data =  ctx.request.body
	let productId = ctx.params.id
	const title = data.title || ''
	const thumbPic = data.thumbPic || []//缩略图，上传组建
	const des = data.des || ''
	const props = data.props  || '' // 引用库
	const isSale = data.isSale || 1 
	const stock = Math.ceil(data.stock) || 1000
	const saleNum = Math.ceil(data.saleNum) || 0
	const price = Number(data.price)  || 0 
	const mprice = Number(data.mprice) || 0 
	const detail = data.detail || ''
	const unit = data.unit || ''// 引用库
	const cateId =data.cateId// 引用库
	const shopId = data.shopId
	let subProds = data.subProds
	console.log(subProds)
	let result = {}
	let productData = {
		title,
		thumbPic,
		des,
		props,
		isSale,
		stock,
		saleNum,
		price,
		mprice,
		detail,
		unit,
		cateId,
		shopId,
		subProds
	}
	productId = productId || 'add'

	// selector = [{
	// 	props: [{name: 'color', value: 'red'}, {name: 'size', value: 'X'}],
	// 	stock: 200,
	// 	price: 2300
	// }]
	try {
		if(productId !== 'add') {
			const product = await Product.findOne({'_id': productId})
		  result = await product.update(productData)
		  
		}else {
			result = await Product.create(productData)
		}
		if (result) ctx.body = ctx.createRes(200, result)
		else ctx.body = ctx.createRes(500, result)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

const getProductById = async function (ctx) {
 const id = ctx.params.id
 let result 
 if (!id) ctx.body = ctx.create(501)
	try{
		result = await Product.findOne({'_id': id})
		if (result) ctx.body = ctx.createRes(200, result)
		else ctx.body = ctx.createRes(502)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	
}

const getProductList = async function (ctx) {
	const query = ctx.query
	let sort = query.sort || ''
	let pageNum = parseInt(query.pageNum)
  pageNum = pageNum && pageNum > 0 ? pageNum : 1
	let pageSize  = parseInt(query.pageSize)
	pageSize = pageSize && pageSize > 0 ? pageSize : 10
	//先查所有
	try {
		let result = await Product.find().sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize)
		let count = await Product.count()
		if (result) ctx.body = ctx.createRes(200, {list: result, count: count, pageNum, pageSize})
		else ctx.body = ctx.createRes(500, result)
	}catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

// 根据商品分类获取商品属性



// const removeProductCates = async () {}
// const removeProductProp = asynce () {}

exports.editProduct = editProduct
exports.getProductById = getProductById
exports.getProductList = getProductList