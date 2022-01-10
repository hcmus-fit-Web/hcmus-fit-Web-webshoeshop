const User = require("../auth/userModel")
const Product = require("../product/productModel")
const Cart = require('../auth/cartModel')

exports.products = async (req,res)=>{
    const idUser = req.user._id
    await Cart.find({idUser:idUser}, async (err,doc)=>{
        if (!doc){
            return
        }
        else {
            const products = []
            for (var i =0;i<doc.length;i++){
                const product =  await Product.findOne({_id:doc[i]['idProduct']})
                products.push(product)
            }
            res.locals.products = products
            res.render('checkout')
        }
    }).clone().catch(err=>{
        console.log(err)
    });
}




