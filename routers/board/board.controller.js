const { User } = require('../../models/index');
const { Board } = require('../../models/index');
const Sequelize = require('sequelize');

let board = async (req, res) => {
    let page = (req.query.id == undefined) ? 1 : req.query.id;
    let offset = ( req.query.id == undefined) ? 0 : 9 * (page - 1);
    let page_array = [];

    let resultsall = await Board.findAll({})
    .then((resultall) => {
        let totalrecord = resultall.length;
        return totalrecord;
    }).catch((error) => {
        console.log(error);
    });


    let results = await Board.findAll({
        limit:9,
        offset:offset,
        order:[['id','DESC']]
    })
        .then((result) => {
            let total_record = result.length;
            let total_page = Math.ceil(resultsall/9);
            for(i=1;i<=total_page;i++){
                page_array.push(i);
            };
            result.forEach(ele => {
                ele.num = total_record;
                total_record--;
            });

            res.render('./board/list.html', {
                boardList:result,
                pagination:page_array,
            });
            console.log(result.length, total_page);
        }).catch((error) => {
            console.log(error);
        })
};

let write = (req, res) => {
    res.render('./board/write.html');
};

let write_success = async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    // let writer = req.body.userid;

    let results = await Board.create({ title, content })

    res.redirect('/board')
}

let view = async (req, res) => {

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
    });
};

let modify = async (req, res) => {

    let boardList = await Board.findAll({
        where: { id: req.query.id }
    })
    res.render('./board/modify.html', {
        boardList: boardList,
        boardid: req.query.id
    });

};


module.exports = {
    board:board,
    write:write,
    view:view,
    modify:modify,
}
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