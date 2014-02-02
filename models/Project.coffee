###
  Défini l'entitée Project
###


module.exports = (sequelize, DataTypes)->

  Project = sequelize.define 'Project', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true

    name:
      type: DataTypes.STRING
      allowNull: false

    description:
      type: DataTypes.TEXT
      allowNull: true
      
  },
  classMethods: {
    associate: (models)->
      
      Project.hasOne models.Image
      Project.belongsTo models.Country
      Project.hasMany models.User
      Project.hasMany models.News

      Project.hasMany models.Room

      Project.hasMany models.Event

  }  
  
