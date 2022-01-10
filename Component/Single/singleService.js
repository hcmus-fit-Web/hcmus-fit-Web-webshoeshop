const Product = require('./singleModel');
const Comment = require('../comment/commentModel');
const {object} = require("alga-js");
const PAGE_SIZE = 3;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


exports.list = () => Product.find({}).limit(PAGE_SIZE).lean();

exports.getSingleWithComments = async function (id,req){
    const products= await Product.findOne({_id: id}).lean();
    const comment = await Comment.find({productId: id}).lean();
    return {products, comment};
}

exports.postComment = function (userId, productId, content) {
    return new Comment({
        userId: userId,
        productId: productId,
        content: content,
        createdAt: new Date()
    }).save();
}

exports.productRelated = async (type,id)=>{
    var products = await Product.find( {$and: [{color:type},{_id :{$ne: id}}] })
    products = shuffle(products)
    const productsRelated = products.slice(products,3);
    return productsRelated
}
