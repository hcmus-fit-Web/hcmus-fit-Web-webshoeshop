const User = require('./userModel');
const bcrypt = require("bcrypt");
const Cart = require('./cartModel');
const Product = require('../product/productModel');


exports.findByUsername = (username) =>{
    const user = User.findOne({
        username:username
    })
    return user;
}

exports.validPassword = async (password,user) => {
    return  bcrypt.compare(password,user.password);
}

exports.register = async (username,password,firstname,lastname,phone) =>{
    const passwordHash = await bcrypt.hash(password,10);
    return User.create({
            username: username,
            firstname:firstname,
            lastname:lastname,
            phone:phone,
            password:passwordHash
    })
}

exports.remove = async (req,res)=>{
    await Cart.findOne({$and:[{idUser:req.user._id},{idProduct: req.params.id}]})
}

exports.addToCard = async (req,res) => {
    const cart =  await Cart.findOne({$and: [{idUser: req.user._id},{idProduct: req.params.id}]})
    console.log(cart)
    if (cart === null){
        return new Cart({
            idUser:req.user._id,
            idProduct:req.params.id
        }).save()

    }else {
        return null
    }
}