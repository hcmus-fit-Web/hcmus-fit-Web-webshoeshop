
const ChangePassService = require("./ChangePassService");

exports.change = (req,res)=>{
    ChangePassService.change(req, res).then(r => console.log(r));
}