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
		###
		if not user.picture
			socket.emit "random_pokemon", null, (img)->
				console.log img
				user.picture = img
				cb()
		###
		cb()


	
	$scope.get_users()



@News_Management = ($scope)->

	$scope.short_list = []
	$scope.list = []

	$scope.get_news_list = ()->
		console.log "Getting news list"
		socket.emit 'get_news_list',null, (response)->
			$scope.list = response

			$scope.short_list = $scope.list.splice(0,3)
			
			for i in $scope.short_list
				i.short_content = i.content.substr(0,250)+'...'
			

			if $scope.list.length is 0
				$scope.list.push {
					id:-1
					title: "There is nothing here :("
					content : "Add a message"
					date: ''
				}

			$scope.$apply()

	$scope.show =  (item)->
		popup = document.querySelector "#popup-news"
		scope = angular.element(popup).scope()
		scope.title = item.title
		scope.content = item.content
				
		$(popup).modal()

	$scope.show_all = ()->
		popup = document.querySelector "#popup-news-all"		
		scope = angular.element(popup).scope()
		if not scope.is_initialized
			scope.initalize($scope.list)		
		scope.show()

	$scope.get_news_list()



@popup_news = ($scope)->
	$scope.title = ""
	$scope.content = ""
	$scope.date= ""


@popup_news_all = ($scope)->
	$scope.is_initialized = false
	$scope.list = []
	$scope.current_content = 

	$scope.initalize = (list)->
		$scope.list = list
		$scope.list[0].active = true
		$scope.activated = $scope.list[0]
		$scope.is_initialized = true


	$scope.show_new = (item)->
		$scope.current_content = item.content
		$scope.activated.active = false

		$scope.activated = item
		$scope.activated.active = true

	
	$scope.show= ()->
		self = document.querySelector "#popup-news-all"
		$("html, body").animate {
			"scrollTop": 0
		}, 500
		$scope.current_content = $scope.activated.content
		$(self).modal()
		

