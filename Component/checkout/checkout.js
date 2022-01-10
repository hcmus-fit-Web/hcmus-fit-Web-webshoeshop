var express = require('express');
var router = express.Router();
var CheckoutController = require("./checkoutController")
/* GET home page. */
router.get('/', CheckoutController.products)

module.exports = router;