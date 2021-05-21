const { User } = require('../../models/index');
const { Board } = require('../../models/index');
const { Comment } = require('../../models/index');
const Sequelize = require('sequelize');

let loadComment = async (req, res) => {

    let commentList = await Comment.findAll({
        where: {
            commentAt: req.body.itemid,
        },
        order: [['id', 'ASC']],
    });
    res.json({
        commentList,
    })
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
};

let delComment = async (req, res) => {
    
    try{
        let cmtid = req.body.cmtid;
        await Comment.destroy({
            where: {id:cmtid}
        })
        console.log(req.body.cmtid);
    } catch(error){console.log(error)}

    res.send('ok')
}



module.exports = {
    loadComment,
    addComment,
    delComment,
};