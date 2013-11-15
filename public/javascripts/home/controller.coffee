#Sockets

socket = io.connect "/home"

socket.on 'connect', ()->
	console.log "IO: Connected!"


	socket.on "message", (data)->
		console.log "Message from server: #{data}"
	

socket.on 'connecting', ()->
	console.log "IO: Connecting to /home..."




# jQUery
# tools
sanitize = (event, jqueryObject)->
    event.preventDefault()
    event.stopPropagation()
    if jqueryObject.is ":animated"
        jqueryObject.stop()
        jqueryObject.clearQueue()

# Angular 



# Controllers
@User_Manager = ($scope)->
	$scope.list = []

	$scope.get_users = ()->
		socket.emit 'get_users_list', null, (response)->
			$scope.list =  response
			for u in $scope.list
				traiter_donnees u, ()->
					$scope.$apply()
			console.log "User list saved"
			
	traiter_donnees = (user, cb)->	
		if not user.picture
			socket.emit "random_pokemon", null, (img)->
				console.log img
				user.picture = img
				cb()


	$(document).ready ()->
		$scope.get_users()



@News_Management = ($scope)->

	$scope.list = []

	$scope.get_news_list = ()->
		console.log "Getting news list"
		socket.emit 'get_news_list',null, (response)->
			$scope.list = response
			console.log "New List : "
			console.log response

			if $scope.list.length is 0
				$scope.list.push {
					id:-1
					title: "There is nothing here :("
					content : "Add a message"
					date: ''
				}

			$scope.$apply()

	$(document).ready ()->
		$scope.get_news_list()