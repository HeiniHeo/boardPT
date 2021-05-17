const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const multer = require('multer');
const path = require('path');

/*  사진업로드 기능은 주석처리 , npm install multer*/
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'public/uploads/')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf()+path.extname(file.originalname))
        }
    }),
});

router.post('/login_check',controller.login_check)
router.post('/join_success',upload.single('userimage'),controller.join_success)

module.exports = router;