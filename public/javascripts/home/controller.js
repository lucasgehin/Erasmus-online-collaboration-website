(function() {
  var $load_img, Documents_list, Events_list, News_list, Projects_list, Users_list, load_count, sanitize;

  News_list = [];

  Events_list = [];

  Documents_list = [];

  Projects_list = [];

  Users_list = [];

  this.socket = io.connect("/home");

  socket.on('connect', function() {
    console.log("IO: Connected!");
    return load_end();
  });

  socket.on("message", function(data) {
    return console.log(data);
  });

  socket.on('connecting', function() {
    console.log("IO: Connecting to /home...");
    return load_start();
  });

  sanitize = function(event, jqueryObject) {
    event.preventDefault();
    event.stopPropagation();
    if (jqueryObject.is(":animated")) {
      jqueryObject.stop();
      return jqueryObject.clearQueue();
    }
  };

  load_count = 0;

  $load_img = $('#ajaxloader');

  this.load_start = function() {
    if (load_count === 0) {
      $load_img.fadeIn('fast');
    }
    return load_count++;
  };

  this.load_end = function() {
    if (load_count > 0) {
      load_count--;
    }
    if (load_count === 0) {
      return $load_img.fadeOut('slow');
    }
  };

  this.User_Manager = function($scope) {
    $scope.list = function() {
      return Users_list;
    };
    $scope.online = function(user) {
      if (user.online) {
        return 'online';
      }
      return 'offline';
    };
    $scope.get_users = function() {
      load_start();
      return socket.emit('get_users_list', null, function(error, response) {
        if (response != null) {
          Users_list = response;
        }
        console.log("User list saved");
        load_end();
        return $scope.$apply();
      });
    };
    return socket.on('connect', function() {
      return $scope.get_users();
    });
  };

  this.News_Management = function($scope) {
    $scope.list = function() {
      return News_list;
    };
    $scope.more = function() {
      return News_list.length === 0 || News_list[0].id === -1;
    };
    $scope.get_news_list = function() {
      console.log("Getting news list");
      load_start();
      return socket.emit('get_news_list', null, function(err, response) {
        load_end();
        console.log(response);
        if (response != null) {
          News_list = response;
        }
        if (News_list.length === 0) {
          News_list.push(JSON.stringify({
            id: -1,
            title: "There is nothing here yet :(",
            content: "Add a message",
            createdAt: new Date()
          }));
        }
        return $scope.$apply();
      });
    };
    socket.on('connect', function() {
      return $scope.get_news_list();
    });
    $scope.show = function(item) {
      var popup, scope;
      popup = document.querySelector("#popup-news");
      scope = angular.element(popup).scope();
      scope.title = item.title;
      scope.content = item.content;
      $(popup).modal();
      return null;
    };
    return $scope.show_all = function() {
      var popup, scope;
      popup = document.querySelector("#popup-news-all");
      scope = angular.element(popup).scope();
      if (!scope.is_initialized) {
        scope.initalize();
      }
      scope.show();
      return null;
    };
  };

  this.Events_Management = function($scope) {
    $scope.list = function() {
      return Events_list;
    };
    $scope.more = function() {
      return Events_list.length === 0 || Events_list[0].id === -1;
    };
    $scope.get_events_next = function() {
      console.log("Getting events list");
      load_start();
      return socket.emit('get_events_next', null, function(err, response) {
        load_end();
        console.log(response);
        if (response != null) {
          Events_list = response;
        }
        if (Events_list.length === 0) {
          Events_list.push(JSON.stringify({
            id: -1,
            title: "Nothing planed today ! :D",
            content: "You can add an event in the calendar if you want.",
            createdAt: new Date()
          }));
        }
        return $scope.$apply();
      });
    };
    socket.on('connect', function() {
      return $scope.get_events_next();
    });
    $scope.show = function(item) {
      var popup, scope;
      popup = document.querySelector("#popup-news");
      scope = angular.element(popup).scope();
      scope.title = item.title;
      scope.content = item.content;
      $(popup).modal();
      return null;
    };
    return $scope.show_all = function() {
      var popup, scope;
      popup = document.querySelector("#popup-news-all");
      scope = angular.element(popup).scope();
      if (!scope.is_initialized) {
        scope.initalize();
      }
      scope.show();
      return null;
    };
  };

  this.Setting_Management = function($scope) {
    return $scope.show = function() {
      var popup, scope;
      popup = document.querySelector("#popup_settings");
      scope = angular.element(popup).scope();
      return $(popup).modal();
    };
  };

  this.Setting_Selection = function($scope) {};

  this.popup_news = function($scope) {
    $scope.title = "";
    $scope.content = "";
    $scope.date = "";
    return null;
  };

  this.popup_news_all = function($scope) {
    $scope.list = function() {
      return News_list;
    };
    $scope.is_initialized = false;
    $scope.current_content = '';
    $scope.initalize = function() {
      News_list[0].active = true;
      $scope.activated = News_list[0];
      $scope.is_initialized = true;
      return null;
    };
    $scope.show_new = function(item) {
      $scope.current_content = item.content;
      $scope.activated.active = false;
      $scope.activated = item;
      $scope.activated.active = true;
      return null;
    };
    $scope.show = function() {
      var self;
      self = document.querySelector("#popup-news-all");
      $("html, body").animate({
        "scrollTop": 0
      }, 500);
      $scope.current_content = $scope.activated.content;
      return $(self).modal();
    };
    return null;
  };

  this.popup_settings = function($scope) {
    $scope.title = "";
    return $scope.content = "";
  };

  this.Project_Manager = function($scope) {
    $scope.list = function() {
      return Projects_list;
    };
    $scope.get_projects = function() {
      load_start();
      return socket.emit('get_projects_list', null, function(error, response) {
        console.log(response);
        if (response != null) {
          Projects_list = response;
        }
        load_end();
        return $scope.$apply();
      });
    };
    return socket.on('connect', function() {
      return $scope.get_projects();
    });
  };

}).call(this);
