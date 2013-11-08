@Sign_in = ($scope) ->
	
	#Models
	$scope.username = ""
	$scope.password = ""
	$scope.message = " "
	$scope.message_color = "black"
	# Values
	message_error_u_p = "Wrong username or password"
	message_connecting = "Connecting"
	message_error_connect = "Connection failed"


	# Functions
	$scope.fields_not_empty = ()->
		ret = "disabled"
		if $scope.username and   $scope.password
			if $scope.username.length isnt 0 or $scope.password.length isnt 0
				ret = ""
		return ret

	$scope.connect = ()->
		$scope.message = message_connecting
		$scope.message_color = "gray"
		connecting = setInterval ()->
			message_end = $scope.message[-3..-1]
			if message_end isnt "..."
				$scope.message += "."
			else
				$scope.message = $scope.message[0..-4]
			$scope.$apply()
		,500

		setTimeout ()->
			clearInterval connecting
			$scope.message = message_error_connect
			$scope.message_color = "red"
			$scope.$apply()
		,4000


	return null;