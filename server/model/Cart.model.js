const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const CartSchema = new Schema({
  userId: String,
  list: [
    {
      prodId: String,
      num: Number
    }
  ],

})

module.exports.CartModel = mongoose.model('Cart', CartSchema)
exports.CartSchema = CartSchema 
