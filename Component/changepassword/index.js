var express = require('express');
var router = express.Router();
const ChangePassController = require("./ChangePassController");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('changepass', { title: 'Express' });
});

router.post('/', ChangePassController.change);

module.exports = router;
