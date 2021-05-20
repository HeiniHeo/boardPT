const express = require('express');
const router = express.Router();
const controller = require('./comment.controller');

router.post('/',controller.loadComment);
router.post('/add',controller.addComment);


module.exports = router;