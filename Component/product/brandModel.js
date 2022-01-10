const mongoose = require("mongoose");


const brandSchema = mongoose.Schema({
    BrandName:{
        type:String
    }
})

const Brand = mongoose.model('brand',brandSchema,'brand');
module.exports = Brand;