root = exports ? this

SessionSockets = require 'session.socket.io'
Socket_io = require 'socket.io'


#  Controlleurs
{Users} = require './Users'
{News} = require './News'
{Projects} = require './Projects'
{Events} = require './Events'

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
    io = Socket_io.listen app, io_options

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



      socket.on "get_users_list", (no_data, callback)=>

        console.log "Sio: Demande de la liste des utilisateurs par #{user}"

        liste_users_a_envoyer = []

        sessions = []

        for id, session_json of @root.sessionStore.sessions
          session = JSON.parse session_json
          sessions.push session


        Users.find_all (err, list_users)->         
                   
          for user in list_users
            user.setDataValue 'online', false
            for session in sessions
              
              username = session.user?.username

              

              console.log "#{user.username}|#{username}"

              if username?
                if user.username is username
                  user.setDataValue 'online', true
                  break

            console.log user.is_connected

            liste_users_a_envoyer.push user
              
          callback err, liste_users_a_envoyer






      socket.on "get_news_list", (no_data, callback)->

        console.log "Sio: Demande de la liste des news par #{user}"

        News.find_all (err, list)->
          callback err, list





      socket.on "get_projects_list", (no_data, callback)->

        console.log "Sio: Demande de la liste des projets par #{user}"

        Projects.find_all (err, list)->
          callback err, list




      socket.on "get_events_next", (no_data, callback)->

        console.log "Sio: Demande de la liste des events les plus proches par #{user}"

        Events.find_next_events (err, list)->
          callback err, list




    @sessionSockets.of('/calendar').on 'connection', (err, socket, session)->

      user = session?.user

      if user?

        
        






        socket.on "get_events_list", (no_data, callback)->
    
          console.log "Sio: Demande de la liste des events par #{user.username}"
    
          Events.find_all (err, list)->

            list_to_send = []
    
            for event in list
              event = set_event_editable( event, user )          

              list_to_send.push event
    
            callback err, list_to_send

            





        socket.on "update_event", (event, callback)->
    
          console.log "Sio: Mise a jour d'un évenement par #{user.username}"

          response=
            response: false
    
          if event_is_editable event, user  # On a le droit de modifier

            event.editable = null

            Events.update event, (err, new_event)->
              if err?
                callback err, null

              else if new_event?

                console.log "\nEvenenment #{new_event.title} mis a jour par #{user.username}\n" 

                response.response = true

                new_event = set_event_editable( new_event, user)

                socket.broadcast.emit 'update_event', new_event
                socket.emit 'update_event', new_event 

                callback null, response
          else
            callback null, response


      else

        console.log "Utilisateur non connecté a tenté d'acceder au calendrier. -> utilisateur ignoré."


# Tools


event_is_editable = (event, user) ->
  
  
  rank_user_event = event.user.statu.rank
  rank_user_session = user.statu?.rank

  return rank_user_event <= rank_user_session

set_event_editable = (event, user) ->

  console.log event
  rank_user_event = event.user.statu.rank
  rank_user_session = user.statu?.rank
  
  event.setDataValue 'is_editable', no

  
  event.setDataValue 'is_editable', yes if rank_user_event <= rank_user_session

  return event  

exports.Sio = Sio