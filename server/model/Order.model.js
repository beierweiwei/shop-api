var mongoose = require('mongoose')
let Schema = mongoose.Schema
let OrderSchema = new Schema({
    orderNo: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: Number,
        require: true,
        default: 0  // 0: 未支付 1: 代发货 2: 待收货 3: 已完成 4: 申请退货中 5: 退货中
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            // ref: 'Product.subProds',
            type: Schema.Types.ObjectId,
        }
    ],
    nums: [{
        type: Number
    }],
    discounttotal: Number,
    discount_projects: Array,
    total: Number

})
module.exports = mongoose.model('Order', OrderSchema)
exports.OrderSchema = OrderSchema