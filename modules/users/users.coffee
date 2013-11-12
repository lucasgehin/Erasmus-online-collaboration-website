
# Imports

DB = require "../../connect_database"



# Décalration

connect = (request, response) ->

	# get params
	username = request.param "username"
	password = request.param "password"

	console.log "Connection de : "+ username + ' | ' + password

	# create query
	query = """
				SELECT *
				 FROM users
				 WHERE username= '?'
				 AND password = '?'
			"""
	params = [
		username,
		password
	]

	# treat query 
	next = ( erreur, lignes, champs)->
		


		message = ""

		if erreur
			console.warn erreur

			message = "error"
		else

			if lignes.length != 1 # Si on a PAS UN couple user/pass qui correspond
				message = "user_not_exist"
			else
				message = "ok"


				###
				ENREGISTREMENT DANS LA SESSION
				###

				request.session.connected = true
				request.session.username = lignes[0].username
				request.session.user_id = lignes[0].id


		retour =
			'message': message 

		retour = JSON.stringify(retour)
		console.log  retour
		response.end retour


	# execute  query
	try		
		DB.query query, params , next
	catch e
		console.warn e


get_users_list = ( callback )->

	# create query
	query = """
				SELECT username
				 FROM users;
				 
			"""
	

	# treat query 
	next = ( erreur, lignes, champs)->
		


		

		if erreur
			console.warn erreur
		else
			callback ( lignes )


	# execute  query
	try		
		DB.query query, [] , next
	catch e
		console.warn e



	

# Exports

exports.connect = connect
exports.get_users_list = get_users_list

