const singleService = require('./singleService');
const Product = require('./singleModel');

exports.postComment = async function (req, res, next){
    const comment = await singleService.postComment(req.user._id, req.params.id, req.body.content);
    res.redirect(`/single/${req.params['id']}`);

};

exports.singleDetail = async function (req, res, next){
   const singleWithComments = await singleService.getSingleWithComments(req.params.id,req);
    res.locals.product = singleWithComments.products;

    const T = singleWithComments.products
    const productRelated = await singleService.productRelated(T['color'],req.params.id)
    res.locals.comment = singleWithComments.comment;
    res.locals.productRelated = productRelated;
   res.render('single');
}

