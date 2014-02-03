
/*
  Défini l'entitée Image
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Image;
    return Image = sequelize.define('Image', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name_hashed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url_hd: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url_thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          Image.belongsTo(models.User);
          Image.belongsTo(models.Country);
          return Image.belongsTo(models.Project);
        }
      }
    });
  };

}).call(this);
