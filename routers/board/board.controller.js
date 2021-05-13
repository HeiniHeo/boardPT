let board = (req, res) => {
    res.render('./board/list.html');
};

let write = (req,res)=>{
    res.render('./board/write.html');
};

let view = (req,res)=>{
    res.render('./board/view.html');
};

let modify = (req,res)=>{
    res.render('./board/modify.html');
};

module.exports = {
    board:board,
    write:write,
    view:view,
    modify:modify,
};

