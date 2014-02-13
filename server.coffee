
# Gobal object

@root = exports ? this

###
 Module dependencies.
###

http = require 'http'
express = require 'express'
connect = require 'connect'
gzippo = require 'gzippo'

routes = require './routes'
path = require 'path'





# On initialise les modèle en les incluant (Meme si on ne les utilisent pas). Cela les force à se charger et à se mettre en cache

{Users} = require './controllers/Users'
db = require "./models"



# Initialisation de l'appli

app = express()
server = http.createServer app

cookieParser = express.cookieParser('your secret sauce here') # Devra être changé !!!!   <-------------------
sessionStore = new connect.middleware.session.MemoryStore()

root.sessionStore = sessionStore

# all environments
app.set 'port', process.env.PORT || 3001
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use cookieParser
app.use express.session {store : sessionStore}
app.use app.router
app.use require('stylus').middleware(__dirname + '/public')

# CACHE

static_content_options = 
  maxAge: 345600000 # 4 jours

#Contenu static avec cache
app.use gzippo.staticGzip(path.join(__dirname, 'public'), static_content_options)


# development only
if 'development' is app.get 'env'
  app.use express.errorHandler()
  app.locals.pretty = true
  console.log "MODE: " + app.get("env")




###

  Routeur

###

app.get '/', routes.login

app.post '/' , Users.connect
app.get '/logout', Users.disconnect

app.get '/home', routes.home

app.get '/easteregg', routes.easteregg

app.get '/calendar', routes.calendar

app.get '/chat', routes.chat


###
 Connection des utilisateurs en AJAX car :
  - Moins lourd
  - Plus sûr tant que l'utilisateur n'est pas authentifié
  - Mois de risque de DDOS, websocket est trop puissant
  - Plus rapide car WebSocket peut mettre du temps s'initialiser au travers des pare-feux
 ###

  


server.listen app.get('port'), ()->
  console.log 'IpVIOPE server listening on port ' + app.get('port')



### 
  Initialisation des modules
###


# On charge le controlleur de websocket pour lui donner le lien avec Express en parametre

{Sio} = require './controllers/Sio'

Sio.init server, sessionStore , cookieParser



###
  Deconnection
###