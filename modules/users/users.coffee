
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
				SELECT username, nom , prenom, country
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


disconnect = (request, response)->
	    if request.session and request.session.connected
	        request.session.destroy()
	    response.redirect "/"
	        # SI (request.session existe et n est pas egal a false) ET (request.session.connected existe et n est pas égal a faux ) , en l occurence connected est égal a true donc ca passe dans tout les autres cas la condition ne sera pas validée

###
get_settings_list = (callback) ->
	#get params
	usersession = request.session.username

	#create query
	query = """
				SELECT username, nom, prenom
				FROM users
				WHERE username= '?'
			"""
	params = [
		usersession
	]

	# treat query 
	next = ( erreur, lignes, champs)->
		
		if erreur
			console.warn erreur
		else
			callback (lignes)
			Console.log (lignes) 

	# execute query
	try
		DB.query query, params , next
	catch e
		console.warn e
###
		

# Exports (fontions accessivles depuis l'exterieur du module)

exports.connect = connect
exports.get_users_list = get_users_list
exports.disconnect = disconnect
###
exports.get_settings_list = get_settings_list
###
