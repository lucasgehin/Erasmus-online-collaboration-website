MYSQL = require 'mysql'
Exception = require './Exception'
{config} = require '../Database_config'

###

Permet d'acceder à la base de données

###



class Database
    
  options = null  # options de connexion à la BDD

  pool = null  # L'objet représentant la connexion

  constructor: -> # vide

  # Methode de classe (static) publique
  @get_connection = ( user_callback )->
    if pool?      
      pool.getConnection (err, connection)->
        console.log err if err?
        user_callback err, connection
    else      
      connect (err, connection )->
        console.log err if err?
        user_callback err, connection



  # Termine la connection . Aussi accessible via connection.end() dans un callback
  
  ###
    @end_connection = ->
    connection.end() if connection
  # Privée permet de creer un objet connexion
  ###

  connect = ( callback )->

    options = config if config?  # On charge la config si elle est présente

    pool = MYSQL.createPool options

    pool.getConnection (err, connection)->
      callback err, connection
    ###
        db.connect (err)->
          if err
            console.warn """
    
            Erreur de connection a la base de donnees :
            #{err}
    
    
            """
            reconnexion()
          else
            connection = db
            user_callback connection
            surveiller_deconnexion db
    ###

  
  surveiller_deconnexion = ( db ) ->

    db.on 'error', ( err )->
      console.warn 'Erreur de la base de donnees!!!', err

      reconnexion()

  reconnexion = ()->
    console.warn 'Reconnexion...'
    connect ( db )->
      console.warn 'Reconnecte !!!'
  

      
exports.Database = Database