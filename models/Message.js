

/*
    Défini l'entitée Message
 */


module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Message;
    Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Message.belongsTo(models.User);
                Message.belongsTo(models.Room);
            }
        }
    });
    return Message;
};
