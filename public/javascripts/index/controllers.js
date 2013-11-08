// Generated by CoffeeScript 1.6.3
(function() {
  this.Sign_in = function($scope) {
    var message_connecting, message_error_connect, message_error_u_p;
    $scope.username = "";
    $scope.password = "";
    $scope.message = " ";
    $scope.message_color = "black";
    message_error_u_p = "Wrong username or password";
    message_connecting = "Connecting";
    message_error_connect = "Connection failed";
    $scope.fields_not_empty = function() {
      var ret;
      ret = "disabled";
      if ($scope.username && $scope.password) {
        if ($scope.username.length !== 0 || $scope.password.length !== 0) {
          ret = "";
        }
      }
      return ret;
    };
    $scope.connect = function() {
      var connecting;
      $scope.message = message_connecting;
      $scope.message_color = "gray";
      connecting = setInterval(function() {
        var message_end;
        message_end = $scope.message.slice(-3);
        if (message_end !== "...") {
          $scope.message += ".";
        } else {
          $scope.message = $scope.message.slice(0, -3);
        }
        return $scope.$apply();
      }, 500);
      return setTimeout(function() {
        clearInterval(connecting);
        $scope.message = message_error_connect;
        $scope.message_color = "red";
        return $scope.$apply();
      }, 4000);
    };
    return null;
  };

}).call(this);
