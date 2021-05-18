const { User } = require('../../models/index');
const { Board } = require('../../models/index');
const { Comment } = require('../../models/index');
const Sequelize = require('sequelize');

let board = async (req, res) => {
    let user_img = await User.findOne({
        where:{userid:req.session.uid}
    })
    let userimage = user_img.dataValues.userimage;

    let page = (req.query.id == undefined) ? 1 : req.query.id;
    let offset = ( req.query.id == undefined) ? 0 : 9 * (page - 1);
    let page_array = [];
    let userid = req.session.uid;

    let getuserinfo = await User.findAll({
        where: {
            userid: userid
        }
    })

    let resultsall = await Board.findAll({})
    .then((resultall) => {
        let totalrecord = resultall.length;
        return totalrecord;
    }).catch((error) => {
        console.log(error);
    });

    let results = await Board.findAll({
        limit:9,
        order:[['id','DESC']],
        offset:offset,
    })
        .then((result) => {
            let total_record = result.length;
            let total_page = Math.ceil(resultsall/9);
            for(i=1;i<=total_page;i++){
                page_array.push(i);
            };
            result.forEach(ele => {
                ele.num = resultsall - offset;
                resultsall--;
            });

            res.render('./board/list.html', {
                boardList:result,
                pagination:page_array,
                userinfo:getuserinfo,
                userinfo:getuserinfo,
                userid:req.session.uid,
                userimage:userimage
            });
        }).catch((error) => {
            console.log(error);
        })

};

let write = async (req, res) => {
    let getuserinfo = await User.findAll({
        where: {
            userid: req.session.uid
        }
    })
    let user_img = await User.findOne({
        where:{userid:req.session.uid}
    })
    let userimage = user_img.dataValues.userimage;

    res.render('./board/write.html',{
        userid:req.session.uid,
        userimage:userimage
    });
    console.log(req.session);
};

let write_success = async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let writer = req.session.uid;

    let results = await Board.create({ title, content , writer })

    res.redirect('/board')
    // res.redirect(`/board/view?id=${req.body.id}`)
}

let view = async (req, res) => {
    let user_img = await User.findOne({
        where:{userid:req.session.uid}
    })
    let userimage = user_img.dataValues.userimage;

        //댓글목록 불러오기
    // let commentWriter = req.body.writer;
    // let commentContent = req.body.comment_content;
    // let commentAt = req.body.itemid;
    // let commentResults = await Comment.create({commentWriter, commentContent, commentAt})
    // let commentList = await Comment.findAll({
    //     where: {
    //         commentAt: req.body.itemid,
    //     },
    //     order: [['id', 'ASC']],
    // });

    // res.json({
    //     commentList,
    // })

    // console.log(commentList,'댓글')

    //

    let boardList = await Board.findAll({
        where: { id: req.query.id }
    })

    let hit = boardList[0].dataValues.hit
    hit += 1
    await Board.update({
        hit: hit
    }, {
        where: { id: req.query.id }
    })

    res.render('./board/view.html', {
        boardList: boardList,
        userid:req.session.uid,
        userimage:userimage
    });
};

let modify = async (req, res) => {
    let user_img = await User.findOne({
        where:{userid:req.session.uid}
    })
    let userimage = user_img.dataValues.userimage;

    let boardList = await Board.findAll({
        where: { id: req.query.id }
    })
    res.render('./board/modify.html', {
        boardList: boardList,
        boardid: req.query.id,
        userid:req.session.uid,
        userimage:userimage
    });

};

let modify_success = async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let id = req.body.boardid;
    console.log(title, content, id)

    let boardList = await Board.update({
        title,
        content,
    }, {
        where: { id: id }
    })
    res.redirect(`/board/view?id=${id}`);
};

let postdel = async (req,res)=>{
    try{
        let id = req.query.id;
        await Board.destroy({
            where:{id:id}
    })
        res.redirect('/board');
        
    } catch(error){console.log(error)}
};

module.exports = {
    board: board,
    write: write,
    view: view,
    modify: modify,
    write_success: write_success,
    modify_success: modify_success,
    postdel:postdel,
};