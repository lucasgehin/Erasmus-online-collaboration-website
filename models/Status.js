
/*
  Défini l'entitée Status
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Status;
    return Status = sequelize.define('Status', {
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
      }
    }, {
      classMethods: {
        associate: function(models) {
          Status.hasMany(models.User);
          Status.hasMany(models.News);
          return Status.hasMany(models.Event);
        }
      }
    });
  };

}).call(this);
