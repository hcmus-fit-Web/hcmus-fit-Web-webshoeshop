var express = require('express');
var router = express.Router();
var singleController = require('./singleController')
/* GET home page. */
router.get('/:id', singleController.singleDetail);
module.exports = router;
