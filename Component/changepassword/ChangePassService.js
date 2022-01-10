const bcrypt = require("bcrypt");
const User = require("../auth/userModel");
exports.change = async (req,res)=>{

    let checkOldPass = false;

    const HashPasswordNew =  await bcrypt.hash(req.body.newpass,10);
    if (await bcrypt.compare(req.body.oldpass,req.user.password)){
        checkOldPass = true;
    }

    if (checkOldPass){
        await User.findOneAndUpdate({_id:req.body._id},{password:HashPasswordNew});
        res.redirect("/");
    }else {
        res.redirect("/changepass?wrong-old-password");
    }

}