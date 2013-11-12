#Sockets

socket = io.connect "/home"

socket.on 'connect', ()->
	console.log "IO: Connected!"


	socket.on "message", (data)->
		console.log "Message from server: #{data}"
	

socket.on 'connecting', ()->
	console.log "IO: Connecting to /home..."


###
inject_into_users = (array)->
	elem = angular.element(
			document.querySelector
		)
###







# jQUery
bind_users = null


$(window).on 'load', ()->

	bind_users = ()->
		$(".user").on "mouseenter", (e)->
			if not $(this).is ":animated"
				sanitize e, $(this)

				$(this).off "mouseenter"
				bind_users_back()

				options = 
					direction : "tb"
					content : "Image ICI, ou inverse"
					speed: 100
				$(this).flip options


	bind_users_back = ()->

		$(".user").on "mouseout", (e)->
			console.log "click"
			if not $(this).is ":animated"
				sanitize e, $(this)
				$(this).off "mouseout"
				bind_users()
				$(this).revertFlip()

		


	bind_users()






# Angular 



# Controllers
@User_Manager = ($scope)->
	$scope.list = []

	$scope.get_users = ()->
		socket.emit 'get_users_list', null, (response)->
			$scope.list = response
			console.log "User list saved"
			$scope.$apply()
			
			interval = setInterval ()->
					if bind_users
						clearInterval interval
						bind_users()
			, 50

	$scope.get_users()





# tools



sanitize = (event, jqueryObject)->
    event.preventDefault()
    event.stopPropagation()
    if jqueryObject.is ":animated"
        jqueryObject.stop()
        jqueryObject.clearQueue()