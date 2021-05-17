const { User } = require('../../models/index');
const sequelize = require('sequelize');

let join = (req,res)=>{
    res.render('./user/join_success.html');
}

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
    let userimage = req.file == undefined ? '' : req.file.filename;

    try{// 요기 rst 부분은 그냥 써놔도 상관없고 나중에
        // 사용할때가 있으면 쓰는거라고 하심(왜 rst인가 했더니 result약자인듯..?)
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