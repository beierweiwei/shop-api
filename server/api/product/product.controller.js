const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const editProduct = async (ctx, next) => {
	if(ctx.params.id === 'add') {
		const data =  ctx.request.body
		const title = data.title
		const thumbPic = data.thumbPic //缩略图，上传组建
		const des = data.des
		const prop = data.prop // 引用库
		const isSale = data.isSale
		const stock = data.stock
		const saleNum = data.saleNum
		const price = data.price 
		const mprice = data.mprice
		const detail = data.detail
		const unit = data.unit // 引用库
		const cateId =data.cateId // 引用库
		const shopId = data.shopId
		console.log(thumbPic)
		const productData = {
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
		try {
			const result = await Product.create(productData)
			ctx.body = ctx.createRes(200)
		}catch(err){
			ctx.throw(err)
		}	
	}
}

exports.editProduct = editProduct