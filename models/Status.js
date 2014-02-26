

/*
    Défini l'entitée Status
 */


module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Status;
    Status = sequelize.define('Status', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        rank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Status.hasMany(models.User);
                Status.hasMany(models.News);
                Status.hasMany(models.Event);
            }
        }
    });
    return Status;
};