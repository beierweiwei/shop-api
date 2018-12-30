const mongoose = require('mongoose')
const escapeSearch = require('../../util/escape')
const Activity = mongoose.model('Activity')
const Product = mongoose.model('Product')
const Coupon = mongoose.model('Coupon')
const { isEarlier } = require('../../util/Date')
exports.create = async function(ctx) {
  const data = ctx.request.body
  let { startTime = 0, endTime = 0  , products, coupons } = data
  if (isEarlier(endTime, startTime)) ctx.body = ctx.createRes(401, '活动结束时间不能早于开始时间！') 
  try {
      let res = await Activity.create(data)
      let id = res._id 
      if(products) {
      	await Product.updateMany({_id: {$in: products}}, {$push: {activities: id}})
      }
      if(coupons) {
        console.log(coupons)
        await Coupon.updateMany({_id: {$in: coupons}}, {$push: {activities: id}})
      }
      ctx.body = ctx.createRes(200, res)
  } catch (err) {
      return ctx.body = ctx.createRes(500, err.message)
  }
    
}
exports.getList = async function(ctx) {
	let query = ctx.query || {}
	let { sort = '', pageSize = 10, pageNum = 1 } = query
	pageSize = parseInt(pageSize) || 10
	pageNum = parseInt(pageNum) || 1
  try {
      let list = await Activity.find().sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize).populate({ path: 'products' }).lean()
      let count = await Activity.count()
      return ctx.body = ctx.createRes(200, { list, count })
  } catch (err) {
      return ctx.body = ctx.createRes(500, err.message)
  }
}
exports.get = async function(ctx) {
    const id = ctx.params.id
    if (!id) return ctx.body = ctx.createRes(401)
    try {
        let res = await Activity.findOne({ _id: id }).populate('products')
        ctx.body = ctx.createRes(200, res)

    } catch (err) {
        ctx.body = ctx.createRes(500, err.message)
    }
}
exports.delete = async function(ctx) {
    let id = ctx.request.body.id
    if (!id) return ctx.body = ctx.createRes(401)
    if (!Array.isArray(id)) id = [id]
    try {
    	let res 
        	await Activity.remove({_id: {$in: id}})
        	res = await Product.update({},{$pull: {activitys: {$in: id}}})
          await Product.updateMany({activities: {$in: id}}, {$pull: {activities: {$in: id}}})
          await Coupon.updateMany({activities: {$in: id}}, {$pull: {activities: {$in: id}}})
        ctx.body = ctx.createRes(200, res)
    } catch (err) {
        ctx.body = ctx.createRes(500, err.message)
    }
}


exports.update = async function(ctx) {
    let data = ctx.request.body
    let id = data.id
    if (!id) return ctx.body = ctx.createRes(401)
    if (!Array.isArray(id)) {
      id = [id]
    }
    let res 
    try {
        if (Array.isArray(data.id)) {
          res = await Activity.updateMany({_id: {$in: id}}, {$set: data})
        } else {
          data.products = data.products || []
          data.coupons = data.coupons || []
          let ActivityDc = await Activity.findOne({_id: id})
          let products = ActivityDc.products 
          let coupons = ActivityDc.coupons 
          let willDeleteProducts = products.filter(prod => !~data.products.indexOf(prod._id))
          let willDeleteCoupons = coupons.filter(coupon => !~data.coupons.indexOf(coupon._id))
          let willAddProducts = data.products.filter(prod => !~products.indexOf(prod._id))
          let willAddCoupons = data.coupons.filter(coupon => !~coupons.indexOf(coupon._id))

          await Product.updateMany({_id: {$in: willDeleteProducts}}, {$pull: {activities: data.id}})
          await Product.updateMany({_id: {$in: willAddProducts}}, {$push: {activities: data.id}})
          await Coupon.updateMany({_id: {$in: willDeleteCoupons}}, {$pull: {activities: data.id}})
          await Coupon.updateMany({_id: {$in: willAddCoupons}}, {$push: {activities: data.id}})
          res = await Activity.updateMany({_id: {$in: id}}, {$set: data})
        }
        ctx.body = ctx.createRes(200, res)
        
    } catch (err) {
        ctx.body = ctx.createRes(501, err.message)
    }
}
exports.search = async function(ctx) {
    let query = ctx.request.query
    let { searchText = '', pageSize = 10, pageNum = 1 } = query
    searchText = escapeSearch(searchText)
    pageSize = parseInt(pageSize)
    pageNum = parseInt(pageNum)
    // 关联模糊查询
    let reg = new RegExp(searchText, 'i')
    let findOper = [{
            $lookup: {
                from: 'Product',
                localField: 'products',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
          $match: {
              $or: [
                  { 'products.title': { $regex: reg }},
                  {'products.desc': {$regex: reg}},
                  {'products.detail': {$regex: reg}}
              ]
          }
        },
        {
            $limit: pageSize
        },
        {
            $skip: (pageNum - 1) * pageSize
        }
    ]
    let countOper = [...findOper, {
        $count: 'count'
    }]
    try {
        let res = await Activity.aggregate(findOper)
        let count = await Activity.aggregate(countOper)
        count = count[0].count
        ctx.body = ctx.createRes(200, { list: res, count })
    } catch (err) {
        ctx.body = ctx.createRes(500, err.message)
    }
}