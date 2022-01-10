var ForgetPassService = require("./ForgetPassService");

exports.forget = async (req,res)=>{
    await ForgetPassService.forget(req,res);
}

exports.reset = async (req,res)=>{
    await ForgetPassService.resetpassword(req,res)
}
exports.resetPass = async (req,res)=>{
    console.log(1);
    await ForgetPassService.resetPass(req,res);
}