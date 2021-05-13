//const {User} = require('../../models/index');

let info = (req, res) => {
    res.render('./user/user_info.html');
}

module.exports = {
    info:info,
}