
db = require '../models'
{Exception} = require './Exception'

Password = require 'password-hash'


###

  Controlleur gérant les utilisateurs

###


class Users
  constructor: ->
  
  #Callback de la forme: (err, list)
  @find_all: (callback) ->

    query = db.User.findAll {include: [db.Country, db.Status, db.Project]}

    query.success (users)->
      #console.log users
      callback null, users

    query.error (err)->
      console.log "Users@find_all: #{err}"
      callback err, null


  #Callback de la forme: (err, item)
  @find_by_id: (id, callback)->

    if typeof id is "number"

      id= parseInt id # On enlève les décimaux 
  
      query  =  db.User.find(id)
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Users@find_all: #{err}"
        callback err, null
    else

      err = new Exception "Users@find_by_id: Id should be an integer in range  [0..n], |#{id}| given. ", 1
      
      callback err, null

  #Callback de la forme: (err, item). username est un champ UNIQUE
  @find_by_username: (username_param, callback)->

    if typeof username_param is "string"
      query  =  db.User.find {where: {username: username_param}}
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Users@find_all: #{err}"
        callback err, null


  #Callback de la forme: (err, item). mail est un champ UNIQUE
  @find_by_mail: (mail_param, callback)->

    if typeof mail_param is "string"
      query  =  db.User.find {where: {mail: mail_param}}
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Users@find_all: #{err}"
        callback err, null



  @connect: (request, response)->
    # get params
    username = request.param "username"
    password = request.param "password"

    console.log "Tentative de connection de : #{username}:#{password} ."

    if typeof username is 'string'
      username = username.trim()

      user_inconnu= ->
        response.end JSON.stringify {response: false}

        console.log "Utilisateur #{username} inconnu."

      query = Users.find_by_username username , (err, user)->
        if err
          response.end err
          console.log err
        
        else if user?
          console.log "Utilisateur #{username} existant."
          if Password.verify password, user.password

            console.log "Mot de passe ok pour #{username}."

            response.end JSON.stringify {response: true} 

            request.session.connected = true
            request.session.user = user

            console.log "#{username}: connecté"
            
          else
            user_inconnu()

        else
          user_inconnu()            


  @disconnect = (request, response)->

    if request.session? and request.session.connected

      request.session.destroy()

    response.redirect "/"




exports.Users = Users