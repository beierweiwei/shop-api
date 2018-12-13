var mongoose = require('mongoose')
let Schema = mongoose.Schema
let ActivitySchema = new Schema({
    title: {
        type: String,
        require: true,
        max: 40
    },
    desc: {
        type: String,
        default: '',
        max: 100 
    },
    thumb: { 
        type: String,
        default: ''
    },
    status: {
        type: Number,
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
    rule: {
        full: {
            type: Number,
            required: true,
            min: 0
        },
        reduce: {
            type: Number,
            required: true,
            min: 0      
        }
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }]

}, {
    usePushEach: true
})
module.exports = mongoose.model('Activity', ActivitySchema)
exports.ActivitySchema = ActivitySchema
