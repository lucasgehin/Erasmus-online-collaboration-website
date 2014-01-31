###
  Défini l'entitée Country
###


module.exports = (sequelize, DataTypes)->

  Country = sequelize.define 'Country', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
  
    name:
      type: DataTypes.STRING
      allowNull: false
      unique: true




  },
  classMethods: {
    associate: (models)->

      Country.hasOne models.Image
      Country.hasMany models.User
      Country.hasMany models.Project

  }  
  
