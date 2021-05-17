const { User } = require('../../models/index');
const sequelize = require('sequelize');

let join = (req,res)=>{
    res.render('./user/join_success.html');
}

let login = (req,res)=>{
    let flag = req.query.flag;
    res.render('./board/login.html',{flag});
}

let login_check = (req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    let result = User.findOne({
        where:{uerid,userpw}
    })
    if(result == null){
        res.redirect('user/login_fail')
    }else{
        req.session.uid = userid;
        req.session.isLogin = true;

        req.session.save(()=>{
            res.redirect('/');
        })
    }
}

let board = (req,res)=>{
    res.render('./board/list.html');
};

let join_success = async(req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;
    let userimage = req.file == undefined ? '' : req.file.filename;

    try{
        let rst = await User.create({userid,userpw,username,userimage})
    } catch(e){
        console.log(e);
    }
    res.render('./user/join_success.html',{
        userid:userid,
        username:username,
    });
    //res.redirect('./board/list',{userid,username,userimage});
}

module.exports = {
    join:join,
    login:login,
    join_success:join_success,
    board:board,
    login_check:login_check,
}