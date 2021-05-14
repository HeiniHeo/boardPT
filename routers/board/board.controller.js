const { User } = require('../../models/index');
const { Board } = require('../../models/index');
const Sequelize = require('sequelize');

let board = async (req, res) => {
    let boardList = await Board.findAll({});
    res.render('./board/list.html',{
        boardList:boardList,
    });
};

let write = (req,res)=>{
    res.render('./board/write.html');
};

let view = async (req,res)=>{
    try{
    let boardList = await Board.findAll({
        where:{id:req.query.id}
    })
        res.render('./board/view.html',{
            boardList:boardList
        });
    
    } catch(error){console.log(error)}
    console.log(req.query.id);

};

let modify = (req,res)=>{
    res.render('./board/modify.html');
};

let write_success = async (req,res)=>{
    let title = req.body.title;
    let content = req.body.content;
    // let writer = req.body.userid;

    try {
        let results = await Board.create({ title, content })
    } catch(error){console.log(error)}
    
    // let insertId = results.insertId;
    // res.redirect(`/board/view?idx=${insertId}`);


    // let findUserId=function(userId){
    //     return db.Board.find({
    //         where:{
    //             id:userId
    //         }
    //     }).then(function(user){
    //         if(!user){
    //             return 'uhm'
    //         }
    //         return user.dataValues
    //     })
    // }

    res.redirect('/board/list')
}

module.exports = {
    board:board,
    write:write,
    view:view,
    modify:modify,
    write_success:write_success,
};

