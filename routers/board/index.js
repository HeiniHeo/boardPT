const express = require('express');
const router = express.Router();
const controller = require('./board.controller');

router.get('/write',controller.write);
router.post('/write_success',controller.write_success);

router.get('/view',controller.view);
router.get('/modify',controller.modify);
router.post('/modify_success',controller.modify_success);
router.get('/delete',controller.postdel);

router.get('/', controller.board);
router.post('/list',controller.board);


module.exports = router;