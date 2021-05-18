const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            commentAt:{
                type:Sequelize.INTEGER(11),
                allowfull:false,
                defaultValue: 1,
            },
            commentWriter:{
                type:Sequelize.STRING(50),
                allowfull:false,
            },
            commentContent:{
                type:Sequelize.TEXT,
                allowfull:false,
            },
            commentDate:{
                type:Sequelize.DATE,
                allowfull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                }
            },
            commentLike:{
                type:Sequelize.INTEGER(11),
                allowfull:false,
                defaultValue: 1,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Comment',
            tableName:'comment',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
