
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
      allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      end: {
        type: DataTypes.DATE,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: true
      }
    }, {
      classMethods: {
        associate: function(models) {
          Event.belongsTo(models.User);
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
