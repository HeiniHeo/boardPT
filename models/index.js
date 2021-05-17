'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Board = require('./board');
const User = require('./user');
<<<<<<< HEAD

=======
>>>>>>> 52363a55fadad36038fe4492714bb21832838626
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User;
User.init(sequelize);

db.Board = Board;
Board.init(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
