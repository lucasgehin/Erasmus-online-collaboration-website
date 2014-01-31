
/*
 Module dependencies.
 */

(function() {
  var app, db, express, gzippo, home, http, io, path, routes, server, static_content_options;

  http = require('http');

  express = require('express');

  gzippo = require('gzippo');

  routes = require('./routes');

  path = require('path');

  io = require("socket.io");

  home = require('./modules/home_page/home');

  db = require("./models");

  app = express();

  server = http.createServer(app);

  io = io.listen(server);

  app.set('port', process.env.PORT || 3001);

  app.set('views', __dirname + '/views');

  app.set('view engine', 'jade');

  app.use(express.favicon());

  app.use(express.logger('dev'));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(express.cookieParser('your secret here'));

  app.use(express.session());

  app.use(app.router);

  app.use(require('stylus').middleware(__dirname + '/public'));

  static_content_options = {
    maxAge: 345600000
  };

  app.use(gzippo.staticGzip(path.join(__dirname, 'public'), static_content_options));

  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
    app.locals.pretty = true;
    console.log("MODE: " + app.get("env"));
  }

  app.get('/', routes.login);

  app.get('/home', routes.home);


  /*
   Connection des utilisateurs en AJAX car :
    - Moins lourd
    - Plus sûr tant que l'utilisateur n'est pas authentifié
    - Mois de risque de DDOS, websocket est trop puissant
    - Plus rapide car WebSocket peut mettre du temps s'initialiser au travers des pare-feux
   */

  server.listen(app.get('port'), function() {
    return console.log('IpVIOPE server listening on port ' + app.get('port'));
  });


  /* 
    Initialisation des modules
   */

  home.init(io);


  /*
    Deconnection
   */

}).call(this);
