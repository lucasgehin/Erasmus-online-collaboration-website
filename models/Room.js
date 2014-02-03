
/*
  Défini l'entitée Room
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Room;
    return Room = sequelize.define('Room', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          Room.belongsTo(models.User, {
            as: 'creator'
          });
          Room.hasMany(models.Message);
          return Room.belongsTo(models.Project);
        }
      }
    });
  };

}).call(this);
