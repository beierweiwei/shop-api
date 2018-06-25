const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const editProduct = async (ctx, next) => {
	const data =  ctx.request.body
	let productId = ctx.params.id
	const title = data.title || ''
	const thumbPic = data.thumbPic || []//缩略图，上传组建
	const des = data.des || ''
	const prop = data.prop  || '' // 引用库
	const isSale = data.isSale || true 
	const stock = data.stock || 1000
	const saleNum = data.saleNum || 0
	const price = data.price  || 0 
	const mprice = data.mprice || 0 
	const detail = data.detail || ''
	const unit = data.unit || ''// 引用库
	const cateId =data.cateId || 0// 引用库
	const shopId = data.shopId || 0
	let result = {}
	let productData = {
		title,
		thumbPic,
		des,
		prop,
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
	try {
		if(productId !== 'add') {
			console.log(productData)
			const product = await Product.findOne({'_id': productId})
		  // console.log(product)
		  
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

const getProductById = async function (ctx, id) {
	const id = ctx.request.params.id
	const resData = {
		code: 200
	}
	if(id) {
		try{
			const product = await Product.findOne('_id', id)
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

exports.editProduct = editProduct