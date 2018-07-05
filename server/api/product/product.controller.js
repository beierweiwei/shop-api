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
	const stock = data.stock || 1000
	const saleNum = data.saleNum || 0
	const price = data.price  || 0 
	const mprice = data.mprice || 0 
	const detail = data.detail || ''
	const unit = data.unit || ''// 引用库
	const cateId =data.cateId// 引用库
	const shopId = data.shopId
	let selector = data.selector
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
		shopId
	}
	productId = productId || 'add'

	// selector = [{
	// 	props: [{name: 'color', value: 'red'}, {name: 'size', value: 'X'}],
	// 	stock: 200,
	// 	price: 2300
	// }]
	productData.subProd = selector.map(subProduct => {
		let tempData = {
			price: subProduct.price,
			stock: subProduct.stock,
			isSale: subProduct.isSale,
			thumbPic: subProduct.thumbPic,
		}
		let tempProp = tempData.props = {}
		subProduct.props.map(prop => {
			tempProp[prop.name] = prop.value
		})
		return tempData
	})
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
	const resData = {
		code: 200
	}
	if(id) {
		try{
			const product = await Product.findOne({'_id': id})
			resData.code = 200
			resData.data = product
		}catch(err) {
			resData.code = 500
			resData.data = err
		}
	}else {
		resData.code = 501
	}
	ctx.body = ctx.createRes(resData.code, resData.data)
}

const getProductList = async function (ctx) {
	const query = ctx.query 
	//先查所有
	try {
		let result = await Product.find({}).sort({'ctime': -1}).exec()
		let count = await Product.count()
		if (result) ctx.body = ctx.createRes(200, {list: result, count: count})
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