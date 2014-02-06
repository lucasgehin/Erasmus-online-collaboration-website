
/*
  Défini l'entitée Message
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Message;
    return Message = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          Message.belongsTo(models.User, {
            as: 'author'
          });
          return Message.belongsTo(models.Room);
        }
      }
    });
  };

}).call(this);