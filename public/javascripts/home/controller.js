/*jslint browser: true*/
/*global $, jQuery, io, angular, moment*/

var $load_img, Documents_list, Events_list, News_list, Projects_list, Users_list, load_count, sanitize, socket, load_start, load_end;

News_list = [];

Events_list = [];

Documents_list = [];

Projects_list = [];

Users_list = [];

load_count = 0;

$load_img = $('#ajaxloader');

load_start = function () {
    "use strict";
    if (load_count === 0) {
        $load_img.fadeIn('fast');
    }
    load_count += 1;
};

load_end = function () {
    "use strict";
    if (load_count > 0) {
        load_count -= 1;
    }
    if (load_count === 0) {
        $load_img.fadeOut('slow');
    }
};

socket = io.connect("/home");

socket.on('connect', function () {
    "use strict";
    console.log("IO: Connected!");
    load_end();
});

socket.on("message", function (data) {
    "use strict";
    console.log(data);
});

socket.on('connecting', function () {
    "use strict";
    console.log("IO: Connecting to /home...");
    load_start();
});

sanitize = function (event, jqueryObject) {
    "use strict";
    event.preventDefault();
    event.stopPropagation();
    if (jqueryObject.is(":animated")) {
        jqueryObject.stop();
        jqueryObject.clearQueue();
    }
};


this.User_Manager = function ($scope) {
    "use strict";
    $scope.list = function () {
        return Users_list;
    };
    $scope.online = function (user) {
        if (user.online) {
            return 'online';
        }
        return 'offline';
    };
    $scope.get_users = function () {

        load_start();
        socket.emit('get_users_list', null, function (error, response) {
            if (response !== null) {
                Users_list = response;
            }
            console.log("User list saved");
            load_end();
            $scope.$apply();
        });
    };
    return socket.on('connect', function () {
        return $scope.get_users();
    });
};

this.News_Management = function ($scope) {
    "use strict";
    $scope.list = function () {
        return News_list;
    };
    $scope.more = function () {
        return News_list.length === 0 || News_list[0].id === -1;
    };
    $scope.get_news_list = function () {
        console.log("Getting news list");
        load_start();
        socket.emit('get_news_list', null, function (err, response) {
            load_end();
            console.log(response);
            if (response !== null) {
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
            $scope.$apply();
            $('.news-date').each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
                console.log(date);
            });
        });
    };
    socket.on('connect', function () {
        $scope.get_news_list();
    });
    $scope.show = function (item) {
        var popup, scope;
        popup = document.querySelector("#popup-news");
        scope = angular.element(popup).scope();
        scope.title = item.title;
        scope.content = item.content;
        $(popup).modal();
    };
    $scope.show_all = function () {
        var popup, scope;
        popup = document.querySelector("#popup-news-all");
        scope = angular.element(popup).scope();
        if (!scope.is_initialized) {
            scope.initalize();
        }
        scope.show();
    };
};

this.Events_Management = function ($scope) {
    "use strict";
    $scope.list = function () {
        return Events_list;
    };
    $scope.more = function () {
        return Events_list.length === 0 || Events_list[0].id === -1;
    };
    $scope.get_events_next = function () {
        console.log("Getting events list");
        load_start();
        socket.emit('get_events_next', null, function (err, response) {
            load_end();
            console.log(response);
            if (response !== null) {
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
            $scope.$apply();
        });
    };
    socket.on('connect', function () {
        $scope.get_events_next();
    });
    $scope.show = function (item) {
        var popup, scope;
        popup = document.querySelector("#popup-news");
        scope = angular.element(popup).scope();
        scope.title = item.title;
        scope.content = item.content;
        $(popup).modal();
        return null;
    };
    $scope.show_all = function () {
        var popup, scope;
        popup = document.querySelector("#popup-news-all");
        scope = angular.element(popup).scope();
        if (!scope.is_initialized) {
            scope.initalize();
        }
        scope.show();
    };
};

this.Setting_Management = function ($scope) {
    "use strict";
    $scope.show = function () {
        var popup;//, scope;
        popup = document.querySelector("#popup_settings");
        //scope = angular.element(popup).scope();
        $(popup).modal();
    };
};

this.Setting_Selection = function ($scope) {};

this.popup_news = function ($scope) {
    "use strict";
    $scope.title = "";
    $scope.content = "";
    $scope.date = "";
};

this.popup_news_all = function ($scope) {
    "use strict";
    $scope.list = function () {
        return News_list;
    };
    $scope.is_initialized = false;
    $scope.current_content = '';
    $scope.initalize = function () {
        News_list[0].active = true;
        $scope.activated = News_list[0];
        $scope.is_initialized = true;

    };
    $scope.show_new = function (item) {
        $scope.current_content = item.content;
        $scope.activated.active = false;
        $scope.activated = item;
        $scope.activated.active = true;
    };
    $scope.show = function () {
        var self;
        self = document.querySelector("#popup-news-all");
        $("html, body").animate({
            "scrollTop": 0
        }, 500);
        $scope.current_content = $scope.activated.content;
        $(self).modal();
    };

};

this.popup_settings = function ($scope) {
    "use strict";
    $scope.title = "";
    $scope.content = "";
};

this.Project_Manager = function ($scope) {
    "use strict";
    $scope.list = function () {
        return Projects_list;
    };
    $scope.get_projects = function () {
        load_start();
        socket.emit('get_projects_list', null, function (error, response) {
            console.log(response);
            if (response !== null) {
                Projects_list = response;
            }
            load_end();
            $scope.$apply();
        });
    };
    socket.on('connect', function () {
        $scope.get_projects();
    });
};