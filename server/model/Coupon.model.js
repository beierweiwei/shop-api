var mongoose = require('mongoose')
let Schema = mongoose.Schema
let CouponSchema = new Schema({
    type: {
        type: Number,
        default: 1, // 优惠券类型。1 平台通用券 2 活动优惠券
    },
    full: {
        type: Number,
        required: true,
        min: 0,
    },
    reduce: {
        type: Number,
        required: true,
        min: 0,
    },
    perMax: {
        type: Number,
        required: true,
        default: 1,
    },
    total: {
        type: Number,
        required: true,
        min: 1,
    },
    rest: {
        type: Number,
        required: true,
        min: 0
    },
    activities: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Activity'
    }],
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: Number, // 1 可使用 2 已冻结 3 已使用 4 已过期
        required: true,
        default: 1
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    utime: {
        type: Date,
        default: Date.now 
    }
}, {
    usePushEach: true
})
module.exports = mongoose.model('Coupon', CouponSchema)
exports.CouponSchema = CouponSchema
