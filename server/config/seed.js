/**
 * 初始化数据
 * 管理员用户
 * email: admin@admin.com
 * password: admin
 */
'use strict'
const mongoose = require('mongoose')
const	User = mongoose.model('User')
const Area = mongoose.model('Area')
// const Business = mongoose.model('Bussiness')
// const Order = mongoose.model('Order')
// const Product = mongoose.model('Product')
// const ProductCates = mongoose.model('ProductCates')

const logger = require('../util/logs').logger

// 初始化标签,文章,用户
module.exports = async ()=>{
	const UserCount = await User.count();
	try {
		if(UserCount === 0) {
			await User.create({
				username: 'wangwang',
				sex: 0,
				tel: '12368132987',
				address: 'xxxxxxxx',
				openid: '123',
				money: 1000
			})
		}
	}catch(err) {
		console.log(err)
	}
	try {
		const AreaCount = await Area.count()
		if (AreaCount === 0) {
			const AreaData = require('./DB/areadb')()
			console.log(AreaData)
			const resutl = await Area.create(AreaData)
			console.log(resutl)	
		}

	}catch(err) {
		console.log(err)
	}
	

// 初始化	
}