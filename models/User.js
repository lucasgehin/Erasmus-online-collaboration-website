
/*
  Défini l'entitée User
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var User;
    return User = sequelize.define('User', {
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
        allowNull: false
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
        validate: {
          isEmail: true
        }
      }
    }, {
      classMethods: {
        associate: function(models) {
          User.belongsTo(models.Status);
          User.belongsTo(models.Project);
          User.belongsTo(models.Country);
          User.hasOne(models.Image);
          User.hasMany(models.News);
          return User.hasMany(models.Event);
        }
      }
    });
  };

}).call(this);
