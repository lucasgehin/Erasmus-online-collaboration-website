###
  Défini l'entitée User
###

module.exports = (sequelize, DataTypes)->

  User = sequelize.define 'User', {

    # CLef primaire 
  
    id :
      type:   DataTypes.INTEGER.UNSIGNED
      autoIncrement: true
      primaryKey: true
  
    # Nom d'utilisateur
    username :
      type:  DataTypes.STRING
      unique: true
      allowNull: false
  
    # Mot de passe hashé
    password :
      type: DataTypes.STRING
      allowNull: false
  
    # Nom réel ( canonique )
    name : 
      type:  DataTypes.STRING
      allowNull: false
  
    # Prénom réel (canonique)
    firstname :
      type:  DataTypes.STRING
      allowNull: false
  
    # E-Mail 
    mail :
      type:  DataTypes.STRING
      allowNull: false
      validate:
        isEmail: true


  },
  {
    classMethods: {
      associate: (models)->
        User.belongsTo models.Status
        User.belongsTo models.Project
        User.belongsTo models.Country
        User.hasOne models.Image
        User.hasMany models.News

        User.hasMany models.Event
    }
  }
