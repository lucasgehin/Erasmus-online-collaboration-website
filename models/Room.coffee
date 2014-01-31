###
  Défini l'entitée Room
###


module.exports = (sequelize, DataTypes)->

  Room = sequelize.define 'Room', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
    name:
      type: DataTypes.STRING
      allowNull: false






  },
  classMethods: {
    associate: (models)->

      Room.belongsTo models.User, {as: 'creator'}
      Room.hasMany models.Message

      Room.belongsTo models.Project

  }  
  
