var express = require('express');
var router = express.Router();
var ForgetPassController = require("./ForgetPassController");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('forgetpass', { title: 'Express' });
});
router.post('/',ForgetPassController.forget);
router.get('/:email/:token',ForgetPassController.reset);
router.post('/reset/:id',ForgetPassController.resetPass);
module.exports = router;
