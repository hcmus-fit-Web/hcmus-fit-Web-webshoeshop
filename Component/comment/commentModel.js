const  mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CommentSchema = mongoose.Schema({

    userId: {
        type : Schema.Types.ObjectId
    },
    productId:{
        type: Schema.Types.ObjectId
    },
    content:{
        type: String
    },
    createdAt:{
        type:Date
    }
})

const comment = mongoose.model('comment', CommentSchema,"comments");
module.exports = comment;