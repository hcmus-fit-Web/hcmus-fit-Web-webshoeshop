const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const router = express.Router();

router.get('/',function (req,res){
    res.render('updateinfo',{
        viewTitle:"User"
    })
});

router.post('/',function (req,res){
    updateRecord(req,res);
})

function updateRecord(req,res){
    console.log(req.body._id)
    User.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc)=>{
        if (!err){
            req.logout();
            res.redirect("login");
        }else{
            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render("updateinfo",{
                    viewTitle:'Update Info',
                    user:req.body
                })
            }
            console.log("Error Update"+err);

        }
    })
}

router.get('/updateinfo/:id',(req,res)=>{
    User.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("updateinfo",{
                viewTitle:"Update Info",
                user:doc
            })
        }
    })
})


module.exports = router;