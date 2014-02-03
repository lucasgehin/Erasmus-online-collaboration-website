SessionSockets = require 'session.socket.io'
Socket_io = require 'socket.io'


#  Controlleurs
{Users} = require './Users'
{News} = require './News'
{Projects} = require './Projects'

###

    Gestion des WebSockets

    Contient également les action d'évenement (routes websocket)
    Ces routes figurent ici car il n'est pas propre d'écouter desouis une route. On écoute plutôt depuis un controlleur

    Sio:  Socket.io ou bien Session socket.io

###


#sessionSockets = new SessionSockets(io, sessionStore, cookieParser);


class Sio

  @sessionSockets

  @init: (app, sessionStore, cookieParser)->

    io_options=
      transports: ['htmlfile', 'xhr-polling', 'jsonp-polling'] # Webscokect disabled due to firewalls
    io = Socket_io.listen app, 

    @sessionSockets = new SessionSockets io, sessionStore, cookieParser

    @routes()

  @routes: ->

    @sessionSockets.of('/home').on 'connection', (err, socket, session)->
      
      user = session?.user?.username

      if user is undefined
        console.log "Demande de connection WS de /home par un anonyme. -> refus"
        return null
      else
        console.log "Demande de connection WS de /home par #{user}. -> ok"



      socket.emit 'message', "Welcome #{user}"



      socket.on "get_users_list", (no_data, callback)->

        console.log "Sio: Demande de la liste des utilisateurs par #{user}"

        Users.find_all (err, list)->
          callback err, list






      socket.on "get_news_list", (no_data, callback)->

        console.log "Sio: Demande de la liste des news par #{user}"

        News.find_all (err, list)->
          callback err, list





      socket.on "get_projects_list", (no_data, callback)->

        console.log "Sio: Demande de la liste des projets par #{user}"

        Projects.find_all (err, list)->
          callback err, list




exports.Sio = Sio