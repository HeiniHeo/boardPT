const { User } = require('../../models/index');
const { Board } = require('../../models/index');
const { Comment } = require('../../models/index');
const Sequelize = require('sequelize');


let loadComment = async (req, res) => {
    // let commentWriter = req.body.writer;
    // let commentContent = req.body.comment_content;
    // let commentAt = req.body.itemid;
    // let commentList = await Comment.findAll({
    //     where: {
    //         commentAt: req.body.itemid,
    //     },
    //     order: [['id', 'ASC']],
    // });

    // res.json({
    //     commentList,
    // })

};

let addComment = async (req, res) => {
    let commentWriter = req.body.writer;
    let commentContent = req.body.comment_content;
    let commentAt = req.body.itemid;
    let commentResults = await Comment.create({commentWriter, commentContent, commentAt})
    let commentList = await Comment.findAll({
        where: {
            commentAt: req.body.itemid,
        },
        order: [['id', 'ASC']],
    });

    res.json({
        commentList,
    })

    console.log(commentList)
    console.log(commentResults)
};



module.exports = {
    loadComment,
    addComment,
};