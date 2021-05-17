let main = (req, res) => {
    res.render('index.html',{
        userid:req.session.uid,
        isLogin:req.session.isLogin,
        flag:req.query.flag
    });
}

module.exports = {main};
