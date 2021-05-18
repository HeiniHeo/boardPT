const express = require('express');
const router = express.Router();
const mainRouter = require('./main/index');
const userRouter = require('./user/index');
const boardRouter = require('./board/index');
const commentRouter = require('./comment/index');

router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/comment',commentRouter);
router.use('/', mainRouter);

module.exports = router;