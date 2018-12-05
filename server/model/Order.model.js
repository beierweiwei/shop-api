var mongoose = require('mongoose')
let Schema = mongoose.Schema
let OrderSchema = new Schema({
    orderNo: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        required: true,
        default: 0  // 0: 未支付 1: 代发货 2: 待收货 3: 已完成 4: 申请退货中 5: 退货中
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Object,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
    }],
    nums: [{
        type: Number
    }],
    discounttotal: Number,
    discount_projects: Array,
    trak: {
      no: String,
      company: String,
      freight: Number // 运费
    },
    total: Number,
    changes: []

}, {
    usePushEach: true
})
module.exports = mongoose.model('Order', OrderSchema)
exports.OrderSchema = OrderSchema
