const  mongoose = require('mongoose');
// const slugify = require('slugify');

// mongoose.Schema.Types.ObjectId
const cartSchema = mongoose.Schema({

    idUser: { type: String, ref: 'User', required: true },
    idProduct: { type: String},
})

const Cart = mongoose.model('cart',cartSchema,'cart');
module.exports = Cart;


