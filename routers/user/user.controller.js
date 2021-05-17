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



let join_success = async(req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let userpw_check = req.body.userpw_check;
    let usermail = req.body.usermail;
    let username = req.body.username;
    let userimage2 = req.file == undefined ? '' : req.file.path;
    let userimage = userimage2.replace('public\\','')

    try{
        let rst = await User.create({userid,userpw,username,usermail,userimage})
    } catch(e){
        console.log(e);
    }
    res.render('./user/join_success.html',{
        userid:userid,
        username:username,
        userpw:userpw,
        userpw_check,
    });
}

let userid_check = async(req,res)=>{
    let flag = false;
    let userid = req.query.userid;
    let result = await User.findOne({
        where:{ userid }
    })

    if(result == undefined){
        flag = true;
    }else{
        flag = false;
    }
    res.json({
        login:flag,
        userid,
        
    })
}

module.exports = {
    login:login,
    join_success:join_success,
    login_check:login_check,
    userid_check:userid_check,
}