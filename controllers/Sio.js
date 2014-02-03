(function() {
  var News, Projects, SessionSockets, Sio, Socket_io, Users;

  SessionSockets = require('session.socket.io');

  Socket_io = require('socket.io');

  Users = require('./Users').Users;

  News = require('./News').News;

  Projects = require('./Projects').Projects;


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
      io = Socket_io.listen(app, this.sessionSockets = new SessionSockets(io, sessionStore, cookieParser));
      return this.routes();
    };

    Sio.routes = function() {
      return this.sessionSockets.of('/home').on('connection', function(err, socket, session) {
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
        return socket.on("get_projects_list", function(no_data, callback) {
          console.log("Sio: Demande de la liste des projets par " + user);
          return Projects.find_all(function(err, list) {
            return callback(err, list);
          });
        });
      });
    };

    return Sio;

  })();

  exports.Sio = Sio;

}).call(this);
