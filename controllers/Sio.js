

var underscore, Events, News, Projects, SessionSockets, Sio, Socket_io, Users, event_is_editable, root, set_event_editable, liste_users, async;


underscore = require('underscore');

async = require("async");

//SessionSockets = require('session.socket.io');

Socket_io = require('socket.io');

var connect = require('connect');

var cookie = require('cookie');

Users = require('./Users').Users;

News = require('./News').News;

Projects = require('./Projects').Projects;

Events = require('./Events').Events;





/*

        Gestion des WebSockets

        Contient également les action d'évenement (routes websocket)
        Ces routes figurent ici car il n'est pas propre d'écouter desouis une route. On écoute plutôt depuis un controlleur

        Sio:    Socket.io ou bien Session socket.io
 */

Sio = (function () {

    "use strict";

    function Sio() {}

    //Sio.sessionSockets;

    Sio.init = function (app, sessionStore, cookieParser) {
        var io, io_options;
        io_options = {
            transports: ['htmlfile', 'xhr-polling', 'jsonp-polling']
        };
        Sio.io = Socket_io.listen(app, io_options);
        Sio.sessionSockets = Sio.io;//new SessionSockets(Sio.io, sessionStore, cookieParser);
        Sio.routes();
    };

    Sio.routes = function () {
        Sio.sessionSockets.of('/home').on('connection', function (err, socket, session) {
            var user;

            user = session !== undefined ? session.user : undefined;
            user = user !== undefined ? user.username : undefined;

            if (user === undefined) {
                console.log("Demande de connection WS de /home par un anonyme. -> refus");
            } else {
                console.log("Demande de connection WS de /home par " + user + ". -> ok");


                socket.emit('message', "Welcome " + user);

                socket.on("get_users_list", function (no_data, callback) {

                    var id, liste_users_a_envoyer, session_json, sessions, store;
                    console.log("Sio: Demande de la liste des utilisateurs par " + user);
                    liste_users_a_envoyer = [];

                    sessions = [];

                    store = global.sessionStore.sessions;
                    for (id in store) {
                        session_json = store[id];
                        session = JSON.parse(session_json);
                        sessions.push(session);
                    }

                    Users.find_all(function (err, list_users) {
                        var username, i, j;

                        for (i = 0; i < list_users.length; i++) {
                            user = list_users[i];
                            user.setDataValue('online', false);
                            for (j = 0; j < sessions.length; j += 1) {
                                session = sessions[j];
                                username = session.user !== undefined ? session.user.username : undefined;
                                console.log(user.username + "|" + username);
                                if (username) {
                                    if (user.username === username) {
                                        user.setDataValue('online', true);
                                        break;
                                    }
                                }
                            }
                            console.log(user.is_connected);
                            liste_users_a_envoyer.push(user);
                        }
                        callback(err, liste_users_a_envoyer);
                    });

                });

                socket.on("get_news_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des news par " + user);
                    News.find_all(function (err, list) {
                        callback(err, list);
                    });
                });
                socket.on("get_projects_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des projets par " + user);
                    Projects.find_all(function (err, list) {
                        callback(err, list);
                    });
                });
                socket.on("get_events_next", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des events les plus proches par " + user);
                    Events.find_next_events(function (err, list) {
                        callback(err, list);
                    });
                });
            }
        });

        Sio.sessionSockets.of('/calendar').on('connection', function (err, socket, session) {

            user = session !== undefined ? session.user : undefined;

            if (user) {
                socket.on("get_events_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des events par " + user.username);
                    Events.find_all(function (err, list) {
                        var event, list_to_send, i;
                        list_to_send = [];
                        for (i = 0; i < list.length; i += 1) {
                            event = list[i];
                            event = set_event_editable(event, user);
                            list_to_send.push(event);
                        }
                        callback(err, list_to_send);
                    });
                });
                socket.on("update_event", function (event, callback) {
                    var response;
                    console.log("Sio: Mise a jour d'un évenement par " + user.username);
                    response = {
                        response: false
                    };
                    if (event_is_editable(event, user)) {
                        event.editable = null;
                        Events.update(event, function (err, new_event) {
                            if (err) {
                                callback(err, null);
                            } else if (new_event) {
                                console.log("\nEvenenment " + new_event.title + " mis a jour par " + user.username + "\n");
                                response.response = true;
                                new_event = set_event_editable(new_event, user);
                                socket.broadcast.emit('update_event', new_event);
                                socket.emit('update_event', new_event);
                                callback(null, response);
                            }
                        });
                    } else {
                        callback(null, response);
                    }
                });
            } else {
                console.log("Utilisateur non connecté a tenté d'acceder au calendrier. -> utilisateur ignoré.");
            }
        });


        Sio.sessionSockets.of('/chat').authorization(function (handshakeData, callback) {
            var cookie_string, parsed_cookies, connect_sid;

            //console.dir(handshakeData);
            //handshakeData.foo = 'baz';

            cookie_string = handshakeData.headers.cookie;
            parsed_cookies = cookie.parse(cookie_string);
            connect_sid = parsed_cookies['connect.sid'].split(':')[1].split('.')[0];
            if (connect_sid) {
                global.sessionStore.get(connect_sid, function (error, session) {
                    handshakeData.session = session;
                    if (error) {
                        callback(error, false);
                    } else {
                        callback(null, true);
                    }
                });
            } else {
                console.log("\n\nCONNECT_SID  pas ok\n\n");
                callback("Sio.js :: /chat : error at handshake  -> No connect_sid for this socket", false);
            }

        }).on('connection', function (socket) {

            var user, sock, clients, last_message_hash;
            user = socket.handshake.session !== undefined ? socket.handshake.session.user : undefined;

            
            if (user) {

                console.log("\n Connexion au chat de " + user.username + " .");
                //console.log(socket.handshake.foo);

                socket.broadcast.emit('newusr', user);



                socket.on('get_userlist', function (no_data, callback) {
                    var u, sock, liste_a_envoyer, clients;
                    console.log("\nget_userslists\n\n");

                    liste_a_envoyer = {};

                    clients = Sio.io.of('/chat').clients();

                    clients.forEach(function (sock) {
                        if (sock.handshake.session) {
                            u = sock.handshake.session.user;
                            liste_a_envoyer[u.id] = u;
                        }
                    });

                    callback(null, liste_a_envoyer);

                    socket.on('message', function (message) {
                        var date;
                        date = new Date();
                        message.user = user;
                        message.date = new Date();
                        console.log("\n\n\nNouveau message dans le chat :  " + message.message + " de " + message.user.username + "\n\n\n");
                        socket.broadcast.emit('message', message);
                        socket.emit('message', message);

                    });

                    socket.on('disconnect', function () {

                        console.log("\n\n\tDisconnect chat " + user.username + "\n\n");
                        socket.broadcast.emit('leave', user);
                    });
                });
            }
        });
    };

    return Sio;

})();



event_is_editable = function (event, user) {
    "use strict";
    var rank_user_event, rank_user_session;
    rank_user_event = event.user.statu.rank;
    rank_user_session = user.statu !== undefined ? user.statu.rank : undefined;
    return rank_user_event <= rank_user_session;
};

set_event_editable = function (event, user) {
    "use strict";
    var rank_user_event, rank_user_session;
    rank_user_event = event.user.statu.rank;
    rank_user_session = user.statu !== undefined ? user.statu.rank : undefined;
    event.setDataValue('is_editable', false);
    if (rank_user_event <= rank_user_session) {
        event.setDataValue('is_editable', true);
    }
    return event;
};


function getSession(socket, callback) {
    "use strict";
    var cookie_string, parsed_cookies, connect_sid;
    console.log(socket);
    cookie_string = socket.request.headers.cookie;
    parsed_cookies = connect.utils.parseCookie(cookie_string);
    connect_sid = parsed_cookies['connect.sid'];
    if (connect_sid) {
        global.sessionStore.get(connect_sid, function (error, session) {
            callback(error, session);
        });
    } else {
        callback("Sio.js :: getSession  -> No connect_sid for this socket", null);
    }
}

exports.Sio = Sio;


