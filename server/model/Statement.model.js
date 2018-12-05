const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
	citme: {
		type: Date,
		default: Date.now
	},
	id: {
		type: String,
		required: true
	}, // 时间 + 编号 + 商品信息
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	}
})