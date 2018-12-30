var mongoose = require('mongoose')
let Schema = mongoose.Schema
let CouponSchema = new Schema({
    type: {
        type: Number,
        default: 1, // 优惠券类型。1 平台通用券 2 活动优惠券
    },
    status: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        default: '',
        required: true
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
    userLevel: { // 需要会员等级
        type: Number,
        default: 0
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
