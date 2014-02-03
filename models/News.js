
/*
  Défini l'entitée News
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var News;
    return News = sequelize.define('News', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT
      }
    }, {
      classMethods: {
        associate: function(models) {
          News.belongsTo(models.User);
          News.belongsTo(models.Project);
          News.belongsTo(models.Status);
          News.hasOne(News, {
            as: 'parent'
          });
          return News.hasOne(News, {
            as: 'child'
          });
        }
      }
    });
  };

}).call(this);
