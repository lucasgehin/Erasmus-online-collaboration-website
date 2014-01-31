###
  Défini l'entitée News
###


module.exports = (sequelize, DataTypes)->

  News = sequelize.define 'News', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    
  
    title:
      type: DataTypes.STRING
      allowNull: false

    content:
      type: DataTypes.TEXT






  },
  classMethods: {
    associate: (models)->

      News.belongsTo models.User
      News.belongsTo models.Project
      News.belongsTo models.Status
      
      News.hasOne News , {as: 'parent'}
      News.hasOne News, {as: 'child'}

      

  }  
  
