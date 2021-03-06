
var Sio, Users, app, connect, cookieParser, db, express, gzippo, http, path, routes, server, sessionStore, static_content_options, dirname;



dirname = __dirname;

/*
 Module dependencies.
 */

http = require('http');
express = require('express');
connect = require('connect');
gzippo = require('gzippo');
routes = require('./routes');
path = require('path');


Users = require('./controllers/Users').Users;
db = require("./models");

app = express();

server = http.createServer(app);

cookieParser = express.cookieParser('your secret sauce here');

sessionStore = new connect.middleware.session.MemoryStore();

global.sessionStore = sessionStore;

app.set('port', process.env.PORT || 3001);
app.set('views', dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cookieParser);
app.use(express.session({
    store: sessionStore
}));

app.use(app.router);
app.use(require('stylus').middleware(dirname + '/public'));
static_content_options = {
    maxAge: 345600000
};

app.use(gzippo.staticGzip(path.join(dirname, 'public'), static_content_options));

if ('development' === app.get('env')) {
    app.use(express.errorHandler());
    app.locals.pretty = true;
    console.log("MODE: " + app.get("env"));
}


/*

Routeur
*/

app.get('/', routes.login);
app.post('/', Users.connect);
app.get('/logout', Users.disconnect);
app.get('/home', routes.home);
app.get('/easteregg', routes.easteregg);
app.get('/documents', routes.documents);
app.get('/calendar', routes.calendar);
app.get('/chat', routes.chat);
app.get('/account', routes.account);
app.post('/account', routes.editAccount);

/*
 Connection des utilisateurs en AJAX car :
- Moins lourd
- Plus sûr tant que l'utilisateur n'est pas authentifié
- Mois de risque de DDOS, websocket est trop puissant
- Plus rapide car WebSocket peut mettre du temps s'initialiser au travers des pare-feux
*/

server.listen(app.get('port'), function () {
    "use strict";
    return console.log('IpVIOPE server listening on port ' + app.get('port'));
});


/* 
Initialisation des modules
*/

Sio = require('./controllers/Sio').Sio;

Sio.init(server, sessionStore, cookieParser);