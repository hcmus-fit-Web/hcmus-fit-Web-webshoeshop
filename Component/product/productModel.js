const  mongoose = require('mongoose');
// const slugify = require('slugify');


const productSchema = mongoose.Schema({

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
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    image4:{
        type:String
    },
})



const Product = mongoose.model('product',productSchema,'product');
module.exports = Product;


