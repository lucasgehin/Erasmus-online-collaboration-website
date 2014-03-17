

/*
    Défini l'entitée User
 */


var Password;

Password = require('password-hash');

module.exports = function (sequelize, DataTypes) {
    "use strict";
    var User;
    User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function (value) {
                var pass;
                pass = Password.generate(value);
                this.setDataValue('password', pass);
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        classMethods: {
            associate: function s(models) {
                User.belongsTo(models.Status);
                User.belongsTo(models.Project);
                User.belongsTo(models.Country);
                User.hasOne(models.Image);
                User.hasMany(models.News);
                User.hasMany(models.Event);
            }
        }
    });
    return User;
};