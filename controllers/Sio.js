(function() {
  var Events, News, Projects, SessionSockets, Sio, Socket_io, Users;

  SessionSockets = require('session.socket.io');

  Socket_io = require('socket.io');

  Users = require('./Users').Users;

  News = require('./News').News;

  Projects = require('./Projects').Projects;

  Events = require('./Events').Events;


  /*
  
      Gestion des WebSockets
  
      Contient également les action d'évenement (routes websocket)
      Ces routes figurent ici car il n'est pas propre d'écouter desouis une route. On écoute plutôt depuis un controlleur
  
      Sio:  Socket.io ou bien Session socket.io
   */

  Sio = (function() {
    function Sio() {}

    Sio.sessionSockets;

    Sio.init = function(app, sessionStore, cookieParser) {
      var io, io_options;
      io_options = {
        transports: ['htmlfile', 'xhr-polling', 'jsonp-polling']
      };
      io = Socket_io.listen(app, io_options);
      this.sessionSockets = new SessionSockets(io, sessionStore, cookieParser);
      return this.routes();
    };

    Sio.routes = function() {
      this.sessionSockets.of('/home').on('connection', function(err, socket, session) {
        var user, _ref;
        user = session != null ? (_ref = session.user) != null ? _ref.username : void 0 : void 0;
        if (user === void 0) {
          console.log("Demande de connection WS de /home par un anonyme. -> refus");
          return null;
        } else {
          console.log("Demande de connection WS de /home par " + user + ". -> ok");
        }
        socket.emit('message', "Welcome " + user);
        socket.on("get_users_list", function(no_data, callback) {
          console.log("Sio: Demande de la liste des utilisateurs par " + user);
          return Users.find_all(function(err, list) {
            return callback(err, list);
          });
        });
        socket.on("get_news_list", function(no_data, callback) {
          console.log("Sio: Demande de la liste des news par " + user);
          return News.find_all(function(err, list) {
            return callback(err, list);
          });
        });
        socket.on("get_projects_list", function(no_data, callback) {
          console.log("Sio: Demande de la liste des projets par " + user);
          return Projects.find_all(function(err, list) {
            return callback(err, list);
          });
        });
        return socket.on("get_events_next", function(no_data, callback) {
          console.log("Sio: Demande de la liste des events les plus proches par " + user);
          return Events.find_next_events(function(err, list) {
            return callback(err, list);
          });
        });
      });
      return this.sessionSockets.of('/calendar').on('connection', function(err, socket, session) {
        var id_status_user_session, user, _ref;
        user = session != null ? session.user : void 0;
        if (user != null) {
          console.log(user);
          id_status_user_session = (_ref = user.statu) != null ? _ref.id.toString() : void 0;
          return socket.on("get_events_list", function(no_data, callback) {
            console.log("Sio: Demande de la liste des events par " + user.username);
            return Events.find_all(function(err, list) {
              var event, id_status_user_event, list_to_send, _i, _len;
              list_to_send = [];
              for (_i = 0, _len = list.length; _i < _len; _i++) {
                event = list[_i];
                id_status_user_event = event.user.StatuId.toString();
                event.setDataValue('editable', false);
                if (id_status_user_event === id_status_user_session) {
                  event.setDataValue('editable', true);
                }
                list_to_send.push(event);
              }
              return callback(err, list_to_send);
            });
          });
        } else {
          return console.log("Utilisateur non connecté a tenté d'acceder au calendrier. -> utilisateur ignoré.");
        }
      });
    };

    return Sio;

  })();

  exports.Sio = Sio;

}).call(this);
