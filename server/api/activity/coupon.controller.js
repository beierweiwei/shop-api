const mongoose = require('mongoose')
const escapeSearch = require('../../util/escape')
const Coupon = mongoose.model('Coupon')
const Product = mongoose.model('Product')
const User = mongoose.model('User')
const Activity = mongoose.model('Activity')
const updateOpts = { runValidators: true } // 开启更新类型校验
// 前台
// 领取优惠券
exports.collect = async function (ctx) {
	const user = ctx.session.user 
	const { id, couponNum } = ctx.request.body
	if (user || id ) ctx.body = ctx.createRes(401)
	try {
		let couponDc = await Coupon.findOne({_id: id})
		let userDc = await User.findOne({_id: user._id})
		couponDc = couponDc || {}
		let perMax = couponDc.perMax
		let restNum = couponDc.rest 
		let total = couponDc.total
		let userCoupons = userDc.coupons || []
		console.log(perMax, restNum, total)
		if (!perMax || !total) ctx.throw('server inner error')
		
		if (restNum <= 0) {
			ctx.throw('优惠券已领完，请择日再来！')
		}

		let userCurtCoupon = userCoupons.find(coupon => {
			return coupon._id.toString() === id
		})
		console.log(userCurtCoupon)
	  if (userCurtCoupon) {
	  	if (userCurtCoupon.num >= couponDc.perMax) {
				ctx.throw('您已经领取过该优惠券了')
			}
			++userCurtCoupon.num
			//
	  } else {
	  	userDc.coupons.push({
	  		_id: couponDc._id,
	  		startTime: couponDc.startTime,
	  		endTime: couponDc.endTime,
	  		reduce: couponDc.reduce,
	  		full: couponDc.full,
	  		activities: couponDc.activities,
	  		num: 1,
	  		status: couponDc.status
	  	})
	  }

		--couponDc.rest
		await couponDc.save()
		await userDc.save()
		ctx.body = ctx.createRes(200)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	} 
}

// 后台
exports.create = async function(ctx) {
  const data = ctx.request.body
	data.rest = data.total
	data.activities = []
  try {
      let res = await Coupon.create(data)
      ctx.body = ctx.createRes(200, res)
  } catch (err) {
      return ctx.body = ctx.createRes(500, err.message)
  }
}
exports.getList = async function(ctx) {
	let query = ctx.query || {}
	let { sort = '', pageSize = 10, pageNum = 1, type, status } = query
	pageSize = parseInt(pageSize) || 10
	pageNum = parseInt(pageNum) || 1
	let findQuery = {}
	if (type) findQuery.type = type 
	if (status) findQuery.status = status 

  try {
      let list = await Coupon.find(findQuery).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize).populate({ path: 'activities' }).lean()
      let count = await Coupon.count(findQuery)
      return ctx.body = ctx.createRes(200, { list, count })
  } catch (err) {
      return ctx.body = ctx.createRes(500, err.message)
  }
}
exports.getOne = async function(ctx) {
    const id = ctx.params.id
    if (!id) return ctx.body = ctx.createRes(401)
    try {
        let res = await Coupon.findOne({ _id: id })
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
    	let res = await Coupon.remove({_id: {$in: id}})
        ctx.body = ctx.createRes(200, res)
    } catch (err) {
        ctx.body = ctx.createRes(500, err.message)
    }
}


exports.update = async function(ctx) {
    let data = ctx.request.body
    console.log(data)
    let id = data.id
    // todo 如果total改变了, reset同时更新 
    if (data.total) data.rest = data.total
    if (!id) return ctx.body = ctx.createRes(401)
    if (!Array.isArray(id)) id = [id]
    try {
        let res = await Coupon.updateMany({_id: {$in: id}}, {$set: data}, updateOpts)
        ctx.body = ctx.createRes(200, res)
    } catch (err) {
        ctx.body = ctx.createRes(501, err.message)
    }
}
// exports.search = async function(ctx) {
//     let query = ctx.request.query
//     let { searchText = '', pageSize = 10, pageNum = 1 } = query
//     searchText = escapeSearch(searchText)
//     pageSize = parseInt(pageSize)
//     pageNum = parseInt(pageNum)
//     // 关联模糊查询
//     let reg = new RegExp(searchText, 'i')
//     let findOper = [{
//             $lookup: {
//                 from: 'Product',
//                 localField: 'products',
//                 foreignField: '_id',
//                 as: 'products'
//             }
//         },
//         {
//           $match: {
//               $or: [
//                   { 'products.title': { $regex: reg }},
//                   {'products.desc': {$regex: reg}},
//                   {'products.detail': {$regex: reg}}
//               ]
//           }
//         },
//         {
//             $limit: pageSize
//         },
//         {
//             $skip: (pageNum - 1) * pageSize
//         }
//     ]
//     let countOper = [...findOper, {
//         $count: 'count'
//     }]
//     try {
//         let res = await Coupon.aggregate(findOper)
//         let count = await Coupon.aggregate(countOper)
//         count = count[0].count
//         ctx.body = ctx.createRes(200, { list: res, count })
//     } catch (err) {
//         ctx.body = ctx.createRes(500, err.message)
//     }
// }