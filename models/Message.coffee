###
  Défini l'entitée Message
###


module.exports = (sequelize, DataTypes)->

  Message = sequelize.define 'Message', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
    content:
      type: DataTypes.TEXT
      allowNull: false






  },
  classMethods: {
    associate: (models)->

      Message.belongsTo models.User, {as: 'author'}
      Message.belongsTo models.Room

  }  
  
