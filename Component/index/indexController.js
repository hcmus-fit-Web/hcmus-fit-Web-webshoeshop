
const indexService = require('./indexService');

exports.list = async function (req ,res){
    const page = req.query.page;
    const index = await indexService.list(page);

    res.locals.products = index;
    res.render('index');
};