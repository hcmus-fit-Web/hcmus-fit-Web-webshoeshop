var express = require('express');
var router = express.Router();
var apiRouter = require("./comment")

router.use('/single',  apiRouter);

module.exports = router;