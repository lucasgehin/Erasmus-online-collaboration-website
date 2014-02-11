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

    allDay:
      type: DataTypes.BOOLEAN
      allowNull: false
      defaultValue: false

    start:
      type: DataTypes.DATE
      allowNull: false
      defaultValue: sequelize.NOW

    end:
      type: DataTypes.DATE
      allowNull: true
      

    url:
      type: DataTypes.STRING
      allowNull: true


    # Suffisement grand pour stocker du #FF00FF du rgba(255,255,255,0.9) du hslv(). etc ...
    
    color:
      type: DataTypes.STRING(30)
      allowNull: true
      


  },
  classMethods: {
    associate: (models)->

      Event.belongsTo models.User
      Event.belongsTo models.Status
      Event.belongsTo models.Project

      Event.hasOne models.Event, {as: 'parent'}
      Event.hasOne models.Event, {as: 'child'}

  }  
  
