
###
 Module dependencies.
###

http = require 'http'
express = require 'express'
gzippo = require 'gzippo'

routes = require './routes'
path = require 'path'

io = require "socket.io"



# Nos modules

DB = require "./connect_database" 
users = require './modules/users/users'
home = require './modules/home_page/home'


# Initialisation

app = express()
server = http.createServer app
io = io.listen server


# all environments
app.set 'port', process.env.PORT || 3001
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.cookieParser('your secret here') # Devra être changé !!!!
app.use express.session()
app.use app.router
app.use require('stylus').middleware(__dirname + '/public')

# CACHE

###app.use (req, res, next) ->
  	#if req.url.indexOf "/" == 0 || req.url.indexOf "/images/" == 0
    	res.setHeader "Cache-Control", "public, max-age=864000"
    	res.setHeader "Expires", new Date(Date.now() + 345600000).toUTCString()
    	next()
###
static_content_options = 
	maxAge: 345600000 # 4 jours

#CONTENU STATIQUE AVEC CACHE
app.use gzippo.staticGzip(path.join(__dirname, 'public'), static_content_options)


# development only
if 'development' is app.get 'env'
	app.use express.errorHandler()
	app.locals.pretty = true
	console.log "MODE: " + app.get("env")


app.get '/', routes.login
app.get '/home', routes.home





###
 Connection des utilisateurs en AJAX car :
 	- Moins lourd
 	- Plus sûr tant que l'utilisateur n'est pas authentifié
 	- Mois de risque de DDOS, websocket est trop puissant
 	- Plus rapide car WebSocket peut mettre du temps s'initialiser au travers des pare-feux
 ###

app.post '/' , users.connect
	


server.listen app.get('port'), ()->
	console.log 'IpVIOPE server listening on port ' + app.get('port')



### 
	Initialisation des modules
###

home.init io  # Give the socket IO instance to home

###
	Deconnection
###
app.get '/logout', users.disconnect