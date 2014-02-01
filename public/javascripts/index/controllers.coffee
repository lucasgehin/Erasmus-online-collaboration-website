###

  Voici les controleurs de la page de login.

  Il est interdit d'utiliser  du websocket ici car l'utilisateur n'est pas encore authentifié.
  Lui ouvrir les websockest lui permettraait de faire du brut force de anière trop puissante.


###


@Sign_in = ($scope, $http) ->
  
  #Models
  $scope.username = "test_student"
  $scope.password = "test_pass"
  $scope.message = " "
  $scope.message_color = "black"

  
  # Values
  message_error_u_p = "Wrong username or password"
  message_connecting = "Connecting"
  message_verify = "Checking"
  message_error_connect = "Connection failed"



  

  # Functions
  
  $scope.connect = ->

    # VIEW

    $scope.message = message_connecting
    $scope.message_color = "gray"

    # Sert a afficher . puis .. puis ... derière le message. Cela indique un chargement à l'utilisateur
    connecting = setInterval ()->
      message_end = $scope.message[-3..-1]
      if message_end isnt "..."
        $scope.message += "."
      else
        $scope.message = $scope.message[0..-4]
      #apply()
    ,500

    failed = ()->
      clearInterval connecting
      $scope.message = message_error_connect
      $scope.message_color = "red"
      #apply()
    
    wrong_data = ()->
      clearInterval connecting
      $scope.message = message_error_u_p
      $scope.message_color = "red"
      #apply()

    # REQUEST


    headers = {'Content-Type': 'application/x-www-form-urlencoded'} 
    # car on envoi un formulaire
    
    params = $.param {
      username : $scope.username,
      password : $scope.password
    }

    options = 
      method: "POST"
      headers: headers
      url: "/"
      data: params

    request = $http options

    request.success ( data, status, headers, config) ->

      if 200 <= status < 300 # if we have a good HTTP response code
        console.log "" + data
        #object = JSON.parse data
        

        if data.response? and data.response is false
          wrong_data()
        else if data.response? and data.response is true
          window.location = "/home"
        else
          console.log data

      

    request.error ( data, status, headers, config) ->
      console.warn "ERROR"
      console.log status
      console.log headers()
      console.log config
      console.log "-------"
      console.log data
      console.log "-------"
      failed()  

  return null


  apply = ()->

    if not $scope.$$phase
      $scope.$apply()