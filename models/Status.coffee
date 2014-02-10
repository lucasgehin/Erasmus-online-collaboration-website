###
  Défini l'entitée Status
###


module.exports = (sequelize, DataTypes)->

  Status = sequelize.define 'Status', {
  
    #Clef primaire
  
    id:
      type: DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true

    name:
      type: DataTypes.STRING
      unique: true
      allowNull: false
  
    # Description
  
    description:
      type: DataTypes.TEXT
      allowNull: true

    rank:
      type: DataTypes.INTEGER.UNSIGNED
      allowNull: false
      


  },
  classMethods: {
    associate: (models)->
      Status.hasMany models.User
      Status.hasMany models.News

      Status.hasMany models.Event

  }  
  
