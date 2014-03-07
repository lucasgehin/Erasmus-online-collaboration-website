/*jslint browser: true*/
/*global $, io, angular, load_start, load_end*/


Array.prototype.remove = function (from, to) {
    "use strict";
    var rest = this.slice(parseInt((to || from), 10) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    this.push.apply(this, rest);
};


var socket, userController, messageController;

function start() {

    "use strict";

    socket = io.connect('/chat', {
        'sync disconnect on unload': true
    });

    load_start();

    socket.on('connect', function () {
        $('#message').focus();
        load_end();
    });

    socket.on('disconnect', function () {
        socket.emit('disconnect_chat', null, null);
    });

}


function initControllers() {

    "use strict";

    /*
        Gère la liste des utilisateurs dans la barre de droite
    */
    window.userController = function ($scope) {

        $scope.liste_users = [];

        $scope.get_userlist = function () {

            socket.emit('get_userlist', null, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    $scope.liste_users = data;
                    $scope.$apply();
                }
            });

        };

        socket.on('connect', function () {
            $scope.get_userlist();
            socket.on('newusr', function (user) {

                console.log(user);
                $scope.liste_users[user.id] = user;
    
                $scope.$apply();
    
            });
            socket.on('leave', function (user) {
                $scope.liste_users.forEach(function (user_in_list, index) {
    
                    if (user.username === user_in_list.username) {
                        $scope.liste_users.remove(index);
                    }
                });
    
                $scope.$apply();
    
            });
        });

        socket.on('reconnect', function () {
            
        });



        $scope.disconnect = function () {
            socket.emit('disconnect');
        };

    };


    /*
        Gère la liste des messages dans la colonne centrale
    */
    messageController = function ($scope) {

        $scope.liste_messages = [];

        $scope.message_typing = "";

        $scope.sendMessage = function () {

            console.log("\n\tEnvoi d'un message\n");

            var message = $scope.message_typing;
            message = message.trim();
            if (message !== "") {
                socket.emit('message', { 
                    message: message,
                    hash: CryptoJS.SHA3(message).toString()
                });
                $scope.message_typing = "";
                $('#new_message input').focus();
            }
        };

        socket.on('connect', function () {

            socket.on('message', function (message) {
                console.log('')
                $scope.liste_messages.push(message);
                $scope.$apply();
            });
        });

    };

}



$(window).load(function () {
    "use strict";
    start();
});
initControllers();
start();

