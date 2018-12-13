const mongoose = require('mongoose')
const escapeSearch = require('../../util/escape')
const Activity = mongoose.model('Activity')
const Product = mongoose.model('Product')
exports.create = async function(ctx) {
  const data = ctx.request.body
  const products = data.products
  try {
      let res = await Activity.create(data)
      console.log(res)
      let id = res._id 
      console.log(id)
      if(products) {
      	await Product.updateMany({_id: {$in: products}}, {$push: {activitys: id}})
      }
      ctx.body = ctx.createRes(200, res)
  } catch (err) {
      return ctx.body = ctx.createRes(500, err.message)
  }
    
}
exports.getList = async function(ctx) {
	console.log('xxxx')
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
        let res = await Activity.findOne({ _id: id })
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
        ctx.body = ctx.createRes(200, res)
    } catch (err) {
        ctx.body = ctx.createRes(500, err.message)
    }
}


exports.update = async function(ctx) {
    let data = ctx.request.body
    let id = data.id
    if (!id) return ctx.body = ctx.createRes(401)
    if (!Array.isArray(id)) id = [id]
    try {
        let res = await Activity.updateMany({_id: {$in: id}}, {$set: data})
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