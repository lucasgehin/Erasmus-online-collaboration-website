
###
 Module dependencies.
###

http = require 'http'
http_proxy = require 'http-proxy' 
express = require 'express'

routes = require './routes'
user = require './routes/user'
path = require 'path'


app = express()
server = http.createServer app

proxy = new http_proxy.RoutingProxy()

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


# VHOST rules


docs_server_emulated = (req, res, callback)->
	proxy.proxyRequest req, res, {
		host:'localhost',
		port: 9001
	}




app.use express.vhost("docs.ipviope.tk", docs_server_emulated)


# development only
if 'development' is app.get 'env'
  app.use express.errorHandler()


app.get '/', routes.index
app.get '/users', user.list

	


server.listen app.get('port'), ()->
  console.log 'Express server listening on port ' + app.get('port')
