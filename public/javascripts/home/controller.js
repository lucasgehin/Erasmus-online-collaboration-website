(function() {
  var sanitize, socket;

  socket = io.connect("/home");

  socket.on('connect', function() {
    console.log("IO: Connected!");
    return socket.on("message", function(data) {
      return console.log("Message from server: " + data);
    });
  });

  socket.on('connecting', function() {
    return console.log("IO: Connecting to /home...");
  });

  sanitize = function(event, jqueryObject) {
    event.preventDefault();
    event.stopPropagation();
    if (jqueryObject.is(":animated")) {
      jqueryObject.stop();
      return jqueryObject.clearQueue();
    }
  };

  this.User_Manager = function($scope) {
    var traiter_donnees;
    $scope.list = [];
    $scope.get_users = function() {
      return socket.emit('get_users_list', null, function(response) {
        var u, _i, _len, _ref;
        $scope.list = response;
        _ref = $scope.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          u = _ref[_i];
          traiter_donnees(u, function() {
            return $scope.$apply();
          });
        }
        return console.log("User list saved");
      });
    };
    traiter_donnees = function(user, cb) {

      /*
      if not user.picture
        socket.emit "random_pokemon", null, (img)->
          console.log img
          user.picture = img
          cb()
       */
      return cb();
    };
    return $scope.get_users();
  };

  this.News_Management = function($scope) {
    $scope.short_list = [];
    $scope.list = [];
    $scope.get_news_list = function() {
      console.log("Getting news list");
      return socket.emit('get_news_list', null, function(response) {
        var i, _i, _len, _ref;
        $scope.list = response;
        $scope.short_list = $scope.list.splice(0, 3);
        _ref = $scope.short_list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.short_content = i.content.substr(0, 250) + '...';
        }
        if ($scope.list.length === 0) {
          $scope.list.push({
            id: -1,
            title: "There is nothing here :(",
            content: "Add a message",
            date: ''
          });
        }
        return $scope.$apply();
      });
    };
    $scope.show = function(item) {
      var popup, scope;
      popup = document.querySelector("#popup-news");
      scope = angular.element(popup).scope();
      scope.title = item.title;
      scope.content = item.content;
      return $(popup).modal();
    };
    $scope.show_all = function() {
      var popup, scope;
      popup = document.querySelector("#popup-news-all");
      scope = angular.element(popup).scope();
      if (!scope.is_initialized) {
        scope.initalize($scope.list);
      }
      return scope.show();
    };
    return $scope.get_news_list();
  };

  this.Setting_Management = function($scope) {
    return $scope.show = function() {
      var popup, scope;
      popup = document.querySelector("#popup_settings");
      scope = angular.element(popup).scope();
      return $(popup).modal();
    };
  };

  this.Setting_Selection = function($scope) {
    $scope.list = [];
    $scope.get_setting = function() {
      return socket.emit('get_settings_list', null, function(response) {
        $scope.list = response;
        console.log(response);
        return console.log("Settings list saved");
      });
    };
    $scope.username = username;
    return $scope.get_setting();
  };

  this.popup_news = function($scope) {
    $scope.title = "";
    $scope.content = "";
    return $scope.date = "";
  };

  this.popup_news_all = function($scope) {
    $scope.is_initialized = false;
    $scope.list = [];
    $scope.current_content = $scope.initalize = function(list) {
      $scope.list = list;
      $scope.list[0].active = true;
      $scope.activated = $scope.list[0];
      return $scope.is_initialized = true;
    };
    $scope.show_new = function(item) {
      $scope.current_content = item.content;
      $scope.activated.active = false;
      $scope.activated = item;
      return $scope.activated.active = true;
    };
    return $scope.show = function() {
      var self;
      self = document.querySelector("#popup-news-all");
      $("html, body").animate({
        "scrollTop": 0
      }, 500);
      $scope.current_content = $scope.activated.content;
      return $(self).modal();
    };
  };

  this.popup_settings = function($scope) {
    $scope.title = "";
    return $scope.content = "";
  };

}).call(this);
