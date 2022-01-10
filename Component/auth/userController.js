const userService = require('./userService');
const checkoutService = require("../checkout/checkoutService");
const productService = require('../product/productService');
const ProductService = require("../product/productService");

exports.login = (req,res) =>{
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login',{wrongPassword});
}

exports.info = (req,res) =>{
    res.render('account');
}

exports.logout = (req,res)=> {
    req.logout();
    res.redirect('/');
}
exports.signup = async (req,res)=>{
    const {username,password,firstname,lastname,phone} = req.body;
    const user =  await userService.register(username,password,firstname,lastname,phone);
    res.redirect('/login');
}
exports.addToCart = async (req,res)=>{
    const item = await userService.addToCard(req,res);
    res.redirect('/checkout');
}

exports.remove = async (req,res)=>{
    console.log('aaa')
    await userService.remove(req,res)
}
exports.remove1 = async (req,res)=>{
    console.log('bbb')
    await userService.remove(req,res)
}

