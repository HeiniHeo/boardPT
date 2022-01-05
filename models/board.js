const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            title:{
                type:Sequelize.STRING(100),
                allowfull:false,
            },
            writer:{
                type:Sequelize.STRING(50),
                allowfull:false,
            },
            content:{
                type:Sequelize.TEXT,
                allowfull:false,
            },
            date:{
                type:Sequelize.DATE,
                allowfull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                }
            },
            hit:{
                type:Sequelize.INTEGER(11),
                allowfull:false,
                defaultValue: 1,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Board',
            tableName:'board',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
