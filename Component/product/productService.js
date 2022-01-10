const  Type = require('../product/typeModel');
const Product = require('../product/productModel');
const  Discount  = require('../product/discountModel');
const  Brand  = require('../product/brandModel');
const  Color  = require('../product/colorModel');

const PAGE_SIZE = 6;
exports.list = (page,query) => {

    return new Promise((resolve,reject) => {

        if (page) {
            
            page = parseInt(page);
            if(page<1) page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Product.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(new Error(err)))
        } else {

            page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Product.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(new Error(err)))
        }
    })
}

exports.type = () => {

    return new Promise((resolve,reject) => {
        Type.find().lean().then(data=>{
            resolve(data)
        }).catch(err => reject(new Error(err)))
    })

}

exports.discount = () => {

    return new Promise((resolve,reject) => {
        Discount.find().lean().then(data=>{
            resolve(data)
        }).catch(err => reject(new Error(err)))
    })

}

exports.color = () => {

    return new Promise((resolve,reject) => {
        Color.find().lean().then(data=>{
            resolve(data)
        }).catch(err => reject(new Error(err)))
    })

}


exports.brand = () => {

    return new Promise((resolve,reject) => {
        Brand.find().lean().then(data=>{
            resolve(data)
        }).catch(err => reject(new Error(err)))
    })

}

exports.findSearch = (req,res)=>{
    return new Promise((resolve,reject) => {
        Product.find({$or : [{name: req.body.search}, {productid: req.body.search} , {color:req.body.search} , {brand:req.body.search}]}).then(data=>{
            resolve(data)
        }).catch(err => reject(new Error(err)))
    })
}





