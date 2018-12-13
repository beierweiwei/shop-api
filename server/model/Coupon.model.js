var mongoose = require('mongoose')
let Schema = mongoose.Schema
let CouponSchema = new Schema({
    type: {
        type: Number,
        default: 1, // 优惠券类型。1 平台通用券 2 活动优惠券
    },
    rule: {
        full: {
            type: Number,
            required: true,
            min: 0,
        },
        reduce: {
            type: Number,
            required: true,
            
        }
    },
    activity: [{
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
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    rest: {
        type: Number
    }
}, {
    usePushEach: true
})
module.exports = mongoose.model('Coupon', CouponSchema)
exports.CouponSchema = CouponSchema
