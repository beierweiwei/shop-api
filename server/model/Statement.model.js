const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
	citme: '',
	id: String, // 时间 + 编号 + 商品信息
	userId: Schema.types.ObjectId,
})