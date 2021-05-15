const {User} = require('../../models/index');

let join = (req,res)=>{
    res.render('./user/join_success.html');
}

let login = (req,res)=>{
    let flag = req.query.flag;
    res.render('./board/login.html',{flag});
}

let board = (req,res)=>{
    res.render('./board/list.html');
};



let join_success = (req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;
    let userimage = req.file == undefined ? '' : req.file.filename;

    try{
        let rst = User.create({userid,userpw,username,userimage})
    } catch(e){
        console.log(e);
    }
    res.render('./user/join_success.html');
    //res.redirect('./board/list',{userid,username,userimage});
}


module.exports = {

    join:join,
    login:login,
    join_success:join_success,
    board:board,
}