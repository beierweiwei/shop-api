const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const AreaSchema = new Schema({
	_id: {
		type: String,
		require: true 
	},
	children: {
		type: Object,
		require: true
	},
})
// const Area = mongoose.model('Area', AreaSchema)
exports.AreaSchema = AreaSchema
module.exports = mongoose.model('Area', AreaSchema)