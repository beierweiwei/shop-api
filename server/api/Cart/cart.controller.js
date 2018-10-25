const mongoose = require('mongoose')
const CartModel = mongoose.model('Cart')
const ProductModel = mongoose.model('Product')
const getCartList  = async function (ctx, next) {
  let prodList = []
  let cart = ctx.request.body.cart || []
  let prodcombine = []
  console.log(ctx.request.body)
  if (ctx.session.cart) {
    // 更新用户cart
    let combinMap = {}
    cart = [...ctx.body.cart, ...cart]
    cart.forEach(prodData => {
      // prodData = {prodId: '', num: xx} 
      combinMap[prodData.prodId]  = (combinMap[prodData.prodId]  || 0) + prodData.num 
    })
    cart = Object.keys(combinMap).map(prodId => {
      return {
        prodId: prodId,
        num: combinMap[prodId]
      }
    })
  }
  if (!cart.length) return ctx.body = ctx.createRes(200, {resList: []})
  cart = cart.filter(prodParam => prodParam.num) 
  prodList = cart.map(prodParam => prodParam.prodId)
  
	try {
    // 查商品
    let prodListRes = await ProductModel.find({'subProds._id': {$in: prodList}}).populate('props').lean()
    if (prodListRes) {
      // 转为plain对象
      prodListRes = JSON.parse(JSON.stringify(prodListRes))
      // 将数据合并
      prodListRes.map(prod => {
        prod.subProds.filter(subProd => ~prodList.indexOf(subProd._id.toString())).map(subProd => {
          prodcombine.push({
            ...prod, ...subProd, num: cart.find(prodParam => prodParam.prodId === subProd._id).num
          })
        })
      })
      prodcombine = prodcombine.map(prod => {
        delete prod.subProds 
        return prod
      })

      // prodListRes =  prodListRes.map(prod => {
        // prodParam = prodList.find(prod => prod.id === prod._id)
        // prod.num = prodParam.num 
     // })
    }
    let resMap = {}
    // 将商品根据商家分组
    prodcombine.map(prod => {
      resMap[prod.shopId]  = resMap[prod.shopId] || []
      resMap[prod.shopId].push(prod)
    })
    // 重新组装一下数据
    let resList = Object.keys(resMap).map(shopId => {
      return {
        shopId,
        prodList: resMap[shopId]
      }
    })
    // 再将商品list存回购物车
    if (ctx.session.admin) {
      let cartRes = null
      let cartDoc = await CartModel.findOne({userId: ctx.session.admin._id})
      if (!cartDoc) {
        cartRes = await CartModel.create({list: cart, userId: ctx.session.admin._id})
      } else {
        cartDoc.list = cart
        cartRes = await cartDoc.save()
      }

      console.log(cartRes)
    }
    // 如果没有编码就默认查省级别list
		ctx.body = ctx.createRes(200, resList)
	}catch(err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.getCartList  = getCartList 
