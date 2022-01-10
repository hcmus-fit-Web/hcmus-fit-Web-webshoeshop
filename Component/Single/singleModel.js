const  mongoose = require('mongoose');
// const slugify = require('slugify');


const singleSchema = mongoose.Schema({

    productid: {
        type : String,
        require : true
    },
    price:{
        type: String
    },
    image:{
        type:String
    },
    image1:{
        type:String
    },
    detail:{
        type:String
    },
    type:{
        type:String
    },
    name:{
        type:String
    }
})

const SingleProduct = mongoose.model('single',singleSchema,'product');
module.exports = SingleProduct;