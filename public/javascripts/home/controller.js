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
            console.log(response);
            load_end();
            $scope.$apply();

        });
    };
    return socket.on('connect', function () {
        return $scope.get_users();
    });
};


this.Documents_Management = function ($scope, $sce) {
    "use strict";
    $scope.list = function () {
        return Documents_list;
    };

    $scope.get_documents_list = function () {
        console.log("Getting documents list");
        //load_start();
        socket.emit('get_documents_list', null, function (err, response) {
            //load_end();
            console.log(response);
            if (response !== null) {
                Documents_list = response;
            }
            if (Documents_list.length === 0 || err) {
                Documents_list.push({
                    id: -1,
                    title: "There is nothing here yet :(",
                    content: "You can add a document in the 'Documents' section.'",
                    createdAt: new Date()
                });
            }
            $scope.$apply();
            //$('.document-date').each(function () {
            //    var date = $(this).text();
            //    date = new Date(date);
            //    date = moment(date).fromNow();
            //    $(this).text(date);
            //});
        });
    };
    socket.on('connect', function () {
        $scope.get_documents_list();
    });
    $scope.show = function (item) {
        var $popup;
        $popup = $("#popup-document");
        $popup.find(".title").text(item.title);
        $popup.find(".content").html(item.content);
        $popup.modal('show');
    };
};


this.News_Management = function ($scope, $sce) {
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
                News_list.push({
                    id: -1,
                    title: "There is nothing here yet :(",
                    content: "You can add a news by clicking 'Add a message'",
                    createdAt: new Date()
                });
            }
            $scope.$apply();
            $('.news-date').each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);

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
        scope.item = item;
        scope.date = moment(item.createdAt).fromNow();
        scope.title = item.title;
        scope.content = $sce.trustAsHtml(item.content);
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

this.Events_Management = function ($scope, $sce) {
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
            console.log('Events:');
            console.log(response);
            if (response !== null) {
                Events_list = response;
            }
            if (Events_list.length === 0) {
                Events_list.push({
                    id: -1,
                    title: "Nothing planed today ! &#9786;",
                    description: "You can add an event in the calendar if you want.",
                    createdAt: new Date()
                });
            }
            $scope.$apply();
            $('.event-date span').each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        });
    };
    socket.on('connect', function () {
        $scope.get_events_next();
    });
    $scope.show = function (item) {
        var popup, scope;
        popup = document.querySelector("#popup-events");
        scope = angular.element(popup).scope();
        scope.item = item;
        scope.title = item.title;
        scope.content = $sce.trustAsHtml(item.description);
        $('.show-event-date').empty();
        $('.show-event-date').eq(0).text(item.start);
        $('.show-event-date').eq(1).text(item.end);
        $(popup).modal();
        setTimeout(function () {
            $('.show-event-date').each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        }, 50);
        return null;
    };
    $scope.show_all = function () {
        var popup, scope;
        popup = document.querySelector("#popup-events-all");
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
    $scope.user = {};
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
        $scope.user = News_list[0].user;
        $scope.date = News_list[0].createdAt;
        $scope.is_initialized = true;
        setTimeout(function () {
            // body...
            $('.news-all-date').delay(2000).each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        }, 500);

    };
    $scope.show_new = function (item) {
        $scope.current_content = item.content;
        $scope.user = item.user;
        delete $scope.date;
        $('.news-all-date').empty();
        $('.news-all-date').text(item.createdAt);
        $scope.activated.active = false;
        $scope.activated = item;
        $scope.activated.active = true;

        setTimeout(function () {

            $('.news-all-date').each(function () {
                var date = $(this).text();

                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        }, 20);
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

this.popup_events = function ($scope) {
    "use strict";
    $scope.title = "";
    $scope.content = "";
    $scope.date = "";
    $scope.user = {};
};

this.popup_events_all = function ($scope, $sce) {
    "use strict";
    $scope.list = function () {
        return Events_list;
    };
    $scope.is_initialized = false;
    $scope.current_content = '';
    $scope.initalize = function () {
        Events_list[0].active = true;
        $scope.activated = Events_list[0];
        $scope.user = Events_list[0].user;
        $scope.date = Events_list[0].createdAt;
        $scope.is_initialized = true;
        setTimeout(function () {
            $('.events-all-date').delay(2000).each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        }, 20);
    };
    $scope.show_new = function (item) {
        $scope.current_content = $sce.trustAsHtml(item.description);
        $scope.user = item.user;
        $scope.activated.active = false;
        $scope.activated = item;
        $scope.activated.active = true;

        $('.events-all-date').eq(0).empty().text(item.start);
        $('.events-all-date').eq(1).empty().text(item.end);

        setTimeout(function () {
            $('.events-all-date').each(function () {
                var date = $(this).text();
                date = new Date(date);
                date = moment(date).fromNow();
                $(this).text(date);
            });
        }, 20);
    };
    $scope.show = function () {
        var self;
        self = document.querySelector("#popup-events-all");
        $("html, body").animate({
            "scrollTop": 0
        }, 500);
        $scope.current_content = $sce.trustAsHtml($scope.activated.description);
        $('.events-all-date').eq(0).empty().text($scope.activated.start);
        $('.events-all-date').eq(1).empty().text($scope.activated.end);
        $(self).modal();
        // setTimeout(function () {
        //     $('.events-all-date').each(function () {
        //         var date = $(this).text();
        //         date = new Date(date);
        //         date = moment(date).fromNow();
        //         $(this).text(date);
        //     });
        // }, 1000);
    };

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

    $scope.show = function (project) {
        var $popup = $("#popup-project");

        $popup.find(".title").text(project.name + " - From " + project.country.name );
        $popup.find(".content").text(project.description);
        $popup.modal('show');
    };
};


angular.module('home', ['ngAnimate']).
    filter('htmlToPlaintext', function () {
        "use strict";
        var parser = document.createElement('div');
        return function (text) {
            var str = String(text).replace(/<[^>]+>/gm, '');
            //str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            parser.innerHTML = str;
            str = parser.textContent;
            parser.textContent = '';
            if (!str || str === 'null') {
                str = '';
            }
            return str;
        };
    });