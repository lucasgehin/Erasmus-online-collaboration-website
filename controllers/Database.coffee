###
  Parametrage de L'ORM
###

Sequelize = require 'sequelize'


{config} = require '../Database_config'

if config?

  try
    ORM = new Sequelize config.database, config.user, config.password, {
      dialect : config.dialect
      host: config.host
      port: config.port
    }
    
    ORM.authenticate().complete (err)->

      if err?
        console.log 'Unable to connect to the database:', err
      else
        console.log 'Connection to Database has been established successfully.'

  catch e
    console.log "Erreur de connexion à la BDD : #{e}" 




exports.db = ORM