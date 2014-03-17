

/*
    Défini l'entitée Room
 */


module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Room;
    Room = sequelize.define('Room', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Room.belongsTo(models.User, {
                    as: 'creator'
                });
                Room.hasMany(models.Message);
                Room.belongsTo(models.Project);
            }
        }
    });
    return Room;
};
