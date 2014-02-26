

/*
    Défini l'entitée Project
 */

module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Project;
    Project = sequelize.define('Project', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Project.hasOne(models.Image);
                Project.belongsTo(models.Country);
                Project.hasMany(models.User);
                Project.hasMany(models.News);
                Project.hasMany(models.Room);
                Project.hasMany(models.Event);
            }
        }
    });
    return Project;
};