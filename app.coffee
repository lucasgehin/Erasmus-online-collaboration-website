
###
 Module dependencies.
###

express = require 'express'
routes = require './routes'
user = require './routes/user'
http = require 'http'
path = require 'path'

httpProxy = require 'http-proxy' 

app = express()

# all environments
app.set 'port', process.env.PORT || 3000
app.set 'views', __dirname + '/views'
app.set 'view engine', 'ejs'
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use require('stylus').middleware(__dirname + '/public')
app.use express.static(path.join(__dirname, 'public'))

# development only
if 'development' is app.get 'env'
  app.use express.errorHandler()


app.get '/', routes.index
app.get '/users', user.list

server = http.createServer app 

server.listen app.get('port'), ()->
  console.log 'Express server listening on port ' + app.get('port')




    

###
 Create a proxy server with custom application logic
###

proxy = httpProxy.createProxyServer {}

# Done


app.get "/etherpad", (req, res)->
	target = 
		'target':"http://localhost:9001"
	
	proxy.web req, res, target

