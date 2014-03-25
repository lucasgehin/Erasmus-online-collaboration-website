

/*
    Défini l'entitée Image
 */

module.exports = function(sequelize, DataTypes) {
    "use strict";
    var Image;
    Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        url_hd: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        url_thumbnail: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Image.belongsTo(models.User);
                Image.belongsTo(models.Country);
                Image.belongsTo(models.Project);
            }
        }
    });
    return Image;
};