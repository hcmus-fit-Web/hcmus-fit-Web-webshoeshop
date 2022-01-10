const  mongoose = require('mongoose');
// const slugify = require('slugify');


const indexSchema = mongoose.Schema({

    productid: {
        type : String,
    },
    price:{
        type: String
    },
    image:{
        type:String
    }


})

const index = mongoose.model('index',indexSchema,'product');
module.exports = index;