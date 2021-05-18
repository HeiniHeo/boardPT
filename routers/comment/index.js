const express = require('express');
const router = express.Router();
const controller = require('./comment.controller');

router.post('/',controller.addComment);
router.post('/del',controller.delComment)


module.exports = router;