var express = require('express');
const commentController = require("./commentController");
var router = express.Router();

router.post('/:id/comments', commentController.postComment);

module.exports = router;
