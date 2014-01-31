###
  Défini l'entitée Event
###


module.exports = (sequelize, DataTypes)->

  Event = sequelize.define 'Event', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
    title:
      type: DataTypes.STRING
      allowNull: false

    description:
      type: DataTypes.TEXT
      allowNull: true

    start_time:
      type: DataTypes.DATE
      allowNull: false
      defaultValue: sequelize.NOW

    end_time:
      type: DataTypes.DATE
      allowNull: false
      defaultValue: sequelize.NOW


    # Peut être par exemple 0: Faible, 1: Normal, 2: Prioritaire, 3: Urgent, 4: Exceptionnel, 5: Optionnel.     
    
    priority:
      type: DataTypes.INTEGER
      allowNull: false
      defaultValue: 1


  },
  classMethods: {
    associate: (models)->

      Event.belongsTo models.User, {as: 'author'}
      Event.belongsTo models.Status
      Event.belongsTo models.Project

      Event.hasOne models.Event, {as: 'parent'}
      Event.hasOne models.Event, {as: 'child'}

  }  
  
