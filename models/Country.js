
/*
  Défini l'entitée Country
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Country;
    return Country = sequelize.define('Country', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      classMethods: {
        associate: function(models) {
          Country.hasOne(models.Image);
          Country.hasMany(models.User);
          return Country.hasMany(models.Project);
        }
      }
    });
  };

}).call(this);
