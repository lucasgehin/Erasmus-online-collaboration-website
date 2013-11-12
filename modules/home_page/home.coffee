#Imports

Users = require "../users/users"


# Define

io = null

init = ( Socket_Instance )->
	io = Socket_Instance
	start_ws()

start_ws = ()->
	io.of('/home').on "connection", (socket) ->

		socket.emit "message", "hello home!"

		socket.on "get_users_list", (no_data, callback)->
			Users.get_users_list (data)->
				callback data




# Exports

exports.init = init



