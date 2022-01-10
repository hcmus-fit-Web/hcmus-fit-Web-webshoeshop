const mongoose = require("mongoose");


const colorSchema = mongoose.Schema({
    color:{
        type:String
    }
})

const Color = mongoose.model('color',colorSchema,'color');
module.exports = Color;