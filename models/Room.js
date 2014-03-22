

/*
    Défini l'entitée Room
 */


module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Room;
    Room = sequelize.define('Room', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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
