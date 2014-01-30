(function() {
  this.Sign_in = function($scope, $http) {
    var apply, message_connecting, message_error_connect, message_error_u_p, message_verify;
    $scope.username = "test_user";
    $scope.password = "test_pass";
    $scope.message = " ";
    $scope.message_color = "black";
    message_error_u_p = "Wrong username or password";
    message_connecting = "Connecting";
    message_verify = "Checking";
    message_error_connect = "Connection failed";
    $scope.init = function() {
      $scope.username = "test_user";
      $scope.password = "test_pass";
      return $scope.$apply();
    };
    $scope.connect = function() {
      var connecting, failed, headers, options, params, request, wrong_data;
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
        return apply();
      }, 500);
      failed = function() {
        clearInterval(connecting);
        $scope.message = message_error_connect;
        return $scope.message_color = "red";
      };
      wrong_data = function() {
        clearInterval(connecting);
        $scope.message = message_error_u_p;
        return $scope.message_color = "red";
      };
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      params = $.param({
        username: $scope.username,
        password: $scope.password
      });
      options = {
        method: "POST",
        headers: headers,
        url: "/",
        data: params
      };
      request = $http(options);
      request.success(function(data, status, headers, config) {
        var object;
        if ((200 <= status && status < 300)) {
          object = data;
          if (object.message === "user_not_exist") {
            return wrong_data();
          } else if (object.message === "ok") {
            return window.location = "/home";
          }
        }
      });
      return request.error(function(data, status, headers, config) {
        console.warn("ERROR");
        console.log(status);
        console.log(headers());
        console.log(config);
        console.log("-------");
        console.log(data);
        console.log("-------");
        return failed();
      });
    };
    return null;
    return apply = function() {
      if (!$scope.$$phase) {
        return $scope.$apply();
      }
    };
  };

}).call(this);
