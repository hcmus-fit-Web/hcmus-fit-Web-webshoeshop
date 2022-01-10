const checkoutService = require("../checkout/checkoutService")
exports.products = async (req,res)=>{
    // const products = await checkoutService.products(req,res)
    // console.log(products)
    await checkoutService.products(req,res)
}

