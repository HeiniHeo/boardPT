const { User } = require('../../models/index');
const sequelize = require('sequelize');

let login = (req,res)=>{
    let flag = req.query.flag;
    res.render('/index.html',{ flag });
    console.log('mainpageda')
}

let login_check = async(req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    console.log(userid,userpw);

    let result = await User.findOne({
        where:{ userid, userpw } 
    })
    
    if(result == null){
        res.redirect('?flag=0')
    }else{
        req.session.uid = userid;
        req.session.isLogin = true;

        req.session.save(()=>{
            res.redirect('/board');
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
    let userimage2 = req.file == undefined ? '' : req.file.path;
    let userimage = userimage2.replace('public\\','')

    try{
        let rst = await User.create({userid,userpw,username,userimage})
    } catch(e){
        console.log(e);
    }
    res.render('./user/join_success.html',{
        userid:userid,
        username:username,
    });
}

module.exports = {
    login:login,
    join_success:join_success,
    board:board,
    login_check:login_check,
}