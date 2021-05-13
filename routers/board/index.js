const express = require('express');
const router = express.Router();
const controller = require('./board.controller');

router.use('/', controller.board);

module.exports = router;