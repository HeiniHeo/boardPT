const express = require('express');
const router = express.Router();
const controller = require('./board.controller');

router.get('/write',controller.write);
router.get('/view',controller.view);
router.get('/modify',controller.modify);
router.get('/', controller.board);
router.post('/list',controller.board);


module.exports = router;