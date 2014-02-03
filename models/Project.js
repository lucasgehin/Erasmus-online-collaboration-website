
/*
  Défini l'entitée Project
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Project;
    return Project = sequelize.define('Project', {
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
        associate: function(models) {
          Project.hasOne(models.Image);
          Project.belongsTo(models.Country);
          Project.hasMany(models.User);
          Project.hasMany(models.News);
          Project.hasMany(models.Room);
          return Project.hasMany(models.Event);
        }
      }
    });
  };

}).call(this);
