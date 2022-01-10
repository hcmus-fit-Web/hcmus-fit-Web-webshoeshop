
const ProductService = require('./productService');

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

exports.list = async function (req ,res){
    const page = req.query.page;
    var products = await ProductService.list(page,req.query);
    const type = await ProductService.type();
    const discount = await ProductService.discount();
    const brand = await ProductService.brand();
    const color = await ProductService.color();
    products = shuffle(products);

    res.locals.type = type;
    res.locals.discount = discount;
    res.locals.products = products;
    res.locals.brand = brand;
    res.locals.color = color;


    console.log(products)

    res.render('list');
};

exports.findsearch = async  (req,res)=>{
    const products = await ProductService.findSearch(req,res);
    res.render("list", {products});
}

