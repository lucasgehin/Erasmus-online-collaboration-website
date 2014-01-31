###
  Défini l'entitée Image
###


module.exports = (sequelize, DataTypes)->

  Image = sequelize.define 'Image', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
  
    name:
      type: DataTypes.STRING
      allowNull: false

    name_hashed:
      type: DataTypes.STRING
      allowNull: false

    
    url_hd:
      type: DataTypes.STRING
      allowNull: false

    url_thumbnail:
      type: DataTypes.STRING
      allowNull: false





  },
  classMethods: {
    associate: (models)->
      Image.belongsTo models.User
      Image.belongsTo models.Country
      Image.belongsTo models.Project

  }  
  
