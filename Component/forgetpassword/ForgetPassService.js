const User = require("../auth/userModel");
const Token = require("./TokenModel");
const nodemailer = require("nodemailer");
const {v4: uuidv4} = require("uuid");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user : process.env.AUTH_EMAIL,
        pass : process.env.AUTH_PASSWORD,
    }
})

transporter.transporter.verify((error,success)=>{

    if (error){
        console.log(error);

    }else {
        console.log("Ready for messages");
        console.log(success);
    }

})

exports.forget = async (req,res)=>{
    const email= req.body.email;
    await User.findOne({username:email},function (err,user){

        if (!user){
            return res.status(400).send({msg:'Your reset password link may have expired. Please click on resend for reset password to your Email.'});
        }
        // if token is found then check valid user
        else {
            var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({msg: err.message});
                }

                // Send email (use credintials of SendGrid)
                var mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: user.username,
                    subject: 'Account Verification Link',
                    text: 'Hello ' + user.username + ',\n\n' + 'Please reset your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/forgetpass\/' + user.username + '\/' + token.token + '\n\nThank You!\n'
                };

                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({msg: 'Technical Issue!, Please click on resend for resetpassword your Email.'});
                    }
                    return res.status(200).send('A reset password email has been sent to ' + req.body.email + '. It will be expire after one day. If you not get reset password Email click on resend token.');
                });
            });
        }
    })
}


exports.resetpassword = async function (req, res) {

    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user
        else{
            User.findOne({ _id: token._userId, username: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                }
                else{

                    res.render("resetpass",{
                        user:user
                    });
                }
            });
        }

    });
};

exports.resetPass = async (req,res)=>{
    const HashPasswordNew =  await bcrypt.hash(req.body.newpass,10);
    await User.findOneAndUpdate({_id:req.params.id},{password:HashPasswordNew});
    res.redirect("/");
}