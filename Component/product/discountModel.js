const mongoose = require("mongoose");


const discountSchema = mongoose.Schema({
    Discount:{
        type:String
    }
})

const Discount = mongoose.model('discount',discountSchema,'discount');
module.exports = Discount;