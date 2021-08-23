const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CartSchema = new Schema({
  userId: {
  	type: String,
  	required: true
  },
  list: [
    {
      id: {
      	type: String,
      	required: true
      },
      num: {
      	type: Number,
      	required: true
      }
    }
  ],

})

module.exports.CartModel = mongoose.model('Cart', CartSchema)
exports.CartSchema = CartSchema
