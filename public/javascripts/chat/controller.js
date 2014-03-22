/*jslint browser: true*/
/*global $, io, angular, moment, load_start, load_end, alert, CryptoJS, scrollMsg, SimpleWebRTC, dynamiseVideo*/


angular.module('chat', ['ngAnimate']);

Array.prototype.remove = function(from, to) {
    "use strict";
    var rest = this.slice(parseInt((to || from), 10) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    this.push.apply(this, rest);
};


var socket, chatController, messageController, User, webrtc, webcamsVisible, time;

function start() {

    "use strict";

    socket = io.connect('/chat', {
        'sync disconnect on unload': true
    });

    load_start();

    socket.on('connect', function() {
        $('#message').focus();
        load_end();
    });

    socket.on('disconnect', function() {
        socket.emit('disconnect_chat', null, null);
    });

    

}


function initControllers() {

    "use strict";

    /*
        Gère la liste des utilisateurs dans la barre de droite
    */

    chatController = function($scope, $window) {

        $scope.liste_users = {};
        $scope.liste_rooms = {};
        $scope.room_joined = {};
        $scope.active_room = "Global";

        /*
            Ces rooms son non suprimables et apparaissent même si elles ne sont pas
            instanciées dans Socket.io
        */

        $scope.protected_rooms = ['Global', 'Project1', 'Project2'];

        $scope.is_protected = function(room_name) {
            var in_array = false;
            $scope.protected_rooms.forEach(function(value) {
                if (value === room_name) {
                    in_array = true;
                    return false;
                }
            });

            return in_array;
        };

        function get_rooms_list() {
            socket.emit('get_rooms_list', null, function(list) {
                //console.log(list);
                var room_name, short_name;
                $scope.liste_rooms = {};

                for (room_name in list) {
                    if (list.hasOwnProperty(room_name) && room_name.length > 5 && room_name.substring(0, 6) === '/chat/') {
                        short_name = room_name.substring(6); // de 6 à la fin de la chaine
                        $scope.liste_rooms[short_name] = short_name;
                    }

                }

                $scope.protected_rooms.forEach(function(room_name) {
                    $scope.liste_rooms[room_name] = room_name;
                });

                try {
                    $scope.$apply();
                } catch (ignore) {}
            });
        }

        function get_userlist(room_name) {

            socket.emit('get_userlist', room_name, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(data);
                    $scope.liste_users = data;
                    $scope.$apply();
                    $(".infoUser").popover();
                }
            });

        }

        socket.on('connect', function() {
            get_rooms_list();
            get_userlist($scope.active_room);
            $scope.room_joined[$scope.active_room] = {
                room_name: $scope.active_room,
                new_message_count: 0
            };

            socket.on('newusr', function(user) {

                get_userlist($scope.active_room);
                $scope.$apply();
                $(".infoUser").popover();

            });

            socket.on('user_joined_a_room', function(room) {
                $scope.liste_rooms[room] = room;
                $scope.$apply();
            });

            setInterval(get_rooms_list, 30000);

            socket.on('leave', function(user) {
                delete $scope.liste_users[user.id];

                $scope.$apply();
            });


            socket.emit('whoami', null, function(user) {
                User = user;
            });

        });

        socket.on('reconnect', function() {

        });



        $scope.disconnect = function() {
            socket.emit('disconnect');
        };

        $scope.create_room = function($event, click) {
            var new_room_name;
            if (click || $event.which === 13) {
                new_room_name = $scope.new_room_name;
                $scope.subscribe(new_room_name);
                $scope.new_room_name = "";
            }
        };

        $scope.subscribe = function(room_name) {
            socket.emit('subscribe', room_name, function() {
                $scope.active_room = room_name;
                $scope.room_joined[room_name] = {
                    room_name : room_name,
                    new_message_count: 0
                };
                get_rooms_list();
                get_userlist(room_name);
            });

        };

        $scope.leave = function(room_name, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            if ($scope.calling && room_name === $scope.webrtc.active_room){
                $scope.end_call();
            }
            socket.emit('unsubscribe', room_name, function() {
                $scope.active_room = 'Global';
                get_rooms_list();
                get_userlist($scope.active_room);
                delete $scope.room_joined[room_name];
                $scope.$apply();
            });
        };


        /* 

        Partie Messages 


        */


        $scope.liste_messages = {};

        $scope.message_typing = "";

        $scope.sendMessage = function() {

            var message = $scope.message_typing;
            message = message.trim();
            if (message !== "") {
                socket.emit('message', {
                    message: message,
                    hash: CryptoJS.SHA3(message).toString(),
                    for: $scope.active_room
                });
                $scope.message_typing = "";
                $('#new_message input').focus();
            }
        };

        socket.on('connect', function() {

            socket.on('message', function(message) {
                if (!$scope.liste_messages[message.for]) {
                    $scope.liste_messages[message.
                        for] = [];
                }
                if ($scope.active_room !== message.for) {
                    if ($scope.room_joined[message.for]) {
                        var room = $scope.room_joined[message.for];
                        room.new_message_count += 1;
                    }
                }
                $scope.liste_messages[message.
                    for].push(message);
                if (message.user.id === User.id) {
                    message.fromMe = true;
                }

                if (!$scope.liste_users[message.user.id]) {
                    get_userlist($scope.active_room);
                }
                $scope.$apply();
                actualise_date();
                scrollMsg($scope.active_room);
            });
        });




        /*


            Partie WebRTC


        */

        $scope.calling = false;
        $scope.webrtc = $window.webrtc;

        $scope.muted = false;

        $scope.call = function (room_name, $event) {
            $event.stopPropagation();
            $event.preventDefault();

            if ($scope.calling) {
                $scope.end_call();
            } else {
                $scope.calling = true;
                $scope.webrtc.startLocalVideo();
                $("#arrowIndicator").fadeIn('slow');
            }
        };

        $scope.end_call = function () {
            $scope.calling = false;
            $scope.webrtc.leaveRoom($scope.webrtc.active_room);
            delete $scope.webrtc.active_room;
            $scope.webrtc.stopLocalVideo();
            $('.conference').find('video').fadeOut(function(){
                $('.conference').animate({
                    height: '0px',
                    opacity: 0,
                    'margin-bottom': '0%'
                }, 600);
                $("#chat").animate({
                    height: '100%'
                });
                webcamsVisible = false;
                $("#remote, #local").empty();
                $scope.$apply();
            });
        };

        var webcamsVisible = false, timeToShow = 500;

        $scope.webrtc.on('readyToCall', function () {
            $("#arrowIndicator").fadeOut('slow');

            $scope.webrtc.joinRoom($scope.active_room);
            $scope.webrtc.active_room = $scope.active_room;
        
            function next() {
                var time = timeToShow;
                $('.conference').find('video').each(function () {
                    $(this).fadeIn(time);
                    time += 250;
                });

                $scope.$apply();
                
            }
        
            if (!webcamsVisible) {
                $('.conference').animate({
                    height: '85px',
                    opacity: 1,
                    'margin-bottom': '1%'
                }, 600, next);
                $("#chat").animate({
                    height: '100%'
                });
                webcamsVisible = true;
            } else {
                next();
            }

        });


        $scope.toggleMute = function () {
            if (!$scope.muted) {
                $scope.webrtc.mute();
                $scope.muted = true;

            } else {
                $scope.webrtc.unmute();
                $scope.muted = false;
            }

            $("#mute").toggleClass("glyphicon-volume-up").toggleClass("glyphicon-volume-off");
        };

    };

}

function actualise_date() {
    "use strict";
    var date, parsedDate, moment_date, previous;
    $(".message .date").each(function() {
        date = $(this);
        previous = date.attr('title');
        if (!previous) {
            date.attr('title', date.text());
            previous = date.text();
        }
        parsedDate = new Date(previous);
        moment_date = moment(parsedDate);
        date.text(moment_date.fromNow());
        date.attr('title', parsedDate);
    });
}

$(window).load(function() {
    "use strict";
    start();
    setTimeout(actualise_date, 60000);
});


initControllers();
start();