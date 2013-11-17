#Imports

News = require "../news/news"
Users = require "../users/users"

request = require "request"


# Define

io = null

init = ( Socket_Instance )->
	io = Socket_Instance
	start_ws()

start_ws = ()->
	io.of('/home').on "connection", (socket) ->

		socket.emit "message", "hello home!"

		socket.on "get_news_list", (no_data, callback)->
			News.get_news_list ( data )->
				callback data


		socket.on "get_users_list", (no_data, callback)->
			Users.get_users_list (data)->
				callback data






		socket.on "random_pokemon", (no_data, callback)->
			base_url = "http://randompokemon.com/"
			url = "#{base_url}random.php?n=1&ubers=true&nfe=true&natures=false&region=all&type=all&iesucks=1384359705075"
			request url , (err, reponse , body)->
				if not err
					if 200 <= reponse.statusCode < 300
						data = body
						inf = data.indexOf "src="
						data = data[inf+5..data.length-1]
						sup = data.indexOf '"'
						data = data[0..sup-1]

						callback base_url+data






# Exports

exports.init = init



