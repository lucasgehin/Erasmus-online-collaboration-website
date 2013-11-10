// Generated by CoffeeScript 1.6.3
/*
 Module dependencies.
*/


(function() {
  var DB, app, express, http, path, routes, server, users;

  http = require('http');

  express = require('express');

  routes = require('./routes');

  path = require('path');

  DB = require("./connect_database");

  users = require('./modules/users/users');

  app = express();

  server = http.createServer(app);

  app.set('port', process.env.PORT || 3001);

  app.set('views', __dirname + '/views');

  app.set('view engine', 'ejs');

  app.use(express.favicon());

  app.use(express.logger('dev'));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(express.cookieParser('your secret here'));

  app.use(express.session());

  app.use(app.router);

  app.use(require('stylus').middleware(__dirname + '/public'));

  app.use(express["static"](path.join(__dirname, 'public')));

  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
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


  app.post('/', users.connect);

  server.listen(app.get('port'), function() {
    return console.log('IpVIOPE server listening on port ' + app.get('port'));
  });

}).call(this);
