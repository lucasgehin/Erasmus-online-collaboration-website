
/*
  Défini l'entitée Event
 */

(function() {
  module.exports = function(sequelize, DataTypes) {
    var Event;
    return Event = sequelize.define('Event', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }, {
      classMethods: {
        associate: function(models) {
          Event.belongsTo(models.User, {
            as: 'author'
          });
          Event.belongsTo(models.Status);
          Event.belongsTo(models.Project);
          Event.hasOne(models.Event, {
            as: 'parent'
          });
          return Event.hasOne(models.Event, {
            as: 'child'
          });
        }
      }
    });
  };

}).call(this);
