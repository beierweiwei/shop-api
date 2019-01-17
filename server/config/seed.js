/**
 * 初始化数据
 * 管理员用户
 * email: admin
 * password: admin
 */
'use strict'
const mongoose = require('mongoose')
const	User = mongoose.model('User')
const Area = mongoose.model('Area')
const Admin = mongoose.model('Admin')
const Postage = mongoose.model('Postage')
const ProductProp = mongoose.model('ProductProp')
const ProductCate = mongoose.model('ProductCate')
const logger = require('../util/logs').logger

// 初始化
module.exports = async (ctx, next)=>{
  try {
    if (!await Admin.count()) {
      await Admin.create({
        username: 'admin',
        password: '6a10723e31a80db923770bedf80c0561',
        level: 0
      })
    }
  }catch(err) {
    // ctx.creaRes(500, err.message)
    console.log(err.message)
  }
	try {
		const AreaCount = await Area.count()
		if (AreaCount === 0) {
			const AreaData = require('./DB/areadb')()
			const resutl = await Area.create(AreaData)
			// console.log(resutl)
		}

	}catch(err) {
		console.log(err)
	}
	// 运费
	try {
		const postageCount = await Postage.count()
		if (!postageCount) {
			const areaDoc = await Area.findOne({_id: '100000'})
			const princes = areaDoc.children
			const postageData = Object.keys(princes).map((princeCode) => {
				return {
					_id: princeCode,
					company: [
						{
							name: '圆通',
							price: 10,
							increacePrice: 5
						},
						{
							name: '顺丰',
							price: 15,
							increacePrice: 5
						},
						{
							name: '圆通',
							price: 10,
							increacePrice: 5
						},
						{
							name: '申通',
							price: 10,
							increacePrice: 5
						},
						{
							name: '中通',
							price: 10,
							increacePrice: 5
						},
						{
							name: '百世汇通',
							price: 10,
							increacePrice: 5
						},
						{
							name: '邮政EMS',
							price: 10,
							increacePrice: 5
						},
						{
							name: '韵达',
							price: 10,
							increacePrice: 5
						}
					],
					name: princes[princeCode],
					default: 0,
					status: 1
				}
			})
			const res = await Postage.create(postageData)
		}

		// 商品属性
		if (!await ProductProp.count()) {
			const productData = require('./DB/productProps').data
			const res = await ProductProp.create(productData)
			console.log('productProp数据初始化完毕')
		}

		if (!await ProductCate.count()) {
			const data = require('./DB/productCate').data
			const res = await ProductCate.create(data)
			console.log('productCate数据初始化完毕')
		}
	} catch (err) {
		console.log(err)
	}

}
