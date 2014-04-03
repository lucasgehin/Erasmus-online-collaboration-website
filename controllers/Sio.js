

var underscore, Events, News, Projects, SessionSockets, Sio, Socket_io, Users, event_is_editable, root, set_event_editable, liste_users, async, Rooms, request;


underscore = require('underscore');

async = require("async");

var exec = require('child_process').exec;
//SessionSockets = require('session.socket.io');

Socket_io = require('socket.io');

var connect = require('connect');

var cookie = require('cookie');

Users = require('./Users').Users;

News = require('./News').News;

Projects = require('./Projects').Projects;

Events = require('./Events').Events;

Rooms = require('./Rooms').Rooms;

request = require('request');


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
            transports: [/*'websocket',*/ 'htmlfile', 'xhr-polling', 'jsonp-polling']
        };
        Sio.io = Socket_io.listen(app, io_options);
        Sio.io.set('log level', 1);
        Sio.routes();
    };

    Sio.etherpadApiKey = "208da60e58e52e342dd544f4fe56e19abbbe029f8663dae6a9ec2d25ac440c49";

    Sio.buildEtherpadUrl = function (methode) {
        return 'http://localhost:9001/api/1/' + methode + '?apikey=' + Sio.etherpadApiKey + '&';
    };


    Sio.getSession = function (handshakeData, callback) {
        var cookie_string, parsed_cookies, connect_sid;

        try {

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
        } catch (error) {
            callback(error, false);
        }
    };


    Sio.routes = function () {

        Sio.io.of('/home').authorization(function (handshakeData, callback) {

            Sio.getSession(handshakeData, callback);

        }).on('connection', function (socket) {
            var user;

            user = socket.handshake.session !== undefined ? socket.handshake.session.user : undefined;


            if (!user) {
                console.log("Demande de connection WS de /home par un anonyme. -> refus");
            } else {
                console.log("Demande de connection WS de /home par " + user.username + ". -> ok");

                socket.emit('message', "Welcome " + user.username);

                socket.on("get_users_list", function (no_data, callback) {

                    var id, liste_users_a_envoyer, session_json, sessions, session, store;
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

                        for (i = 0; i < list_users.length; i += 1) {
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

                socket.on("get_documents_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des documents par " + user.username);
                    //News.find_all(function (err, list) {
                    //    callback(err, list);
                    //});

                    var fake_docs = [
                        {
                            id: -1,
                            title: "To all students",
                            content: "Each student should present their identity card (or equivalent) as soon as they arrive.",
                            important: true
                        },
                        {
                            id: -1,
                            title: "Welcome in Portugal",
                            content: "Welcome to all students",
                            important: true
                        },
                        {
                            id: -1,
                            title: "Schedule of the ERASMUS contest",
                            content: "Please look at the calendar",
                            important: true
                        },
                        {
                            id: -1,
                            title: "Usefull information",
                            content: "You'll find bellow a list of museums, railway sations, tourism spots, etc...",
                            important: true
                        },
                    ];
                    callback(null, fake_docs); // TODO
                });
                socket.on("get_news_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des news par " + user.username);
                    News.find_all(function (err, list) {
                        callback(err, list);
                    });
                });
                socket.on("get_projects_list", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des projets par " + user.username);
                    Projects.find_all(function (err, list) {
                        callback(err, list);
                    });
                });
                socket.on("get_events_next", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des events les plus proches par " + user.username);
                    Events.find_next_events(function (err, list) {
                        callback(err, list);
                        console.log("\n\n EVENTS: \n\n" + JSON.stringify(list));

                    });
                });
            }
        });

        Sio.io.of('/calendar').authorization(function (handshakeData, callback) {

            Sio.getSession(handshakeData, callback);

        }).on('connection', function (socket) {
            var user;
            user = socket.handshake.session !== undefined ? socket.handshake.session.user : undefined;

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


        Sio.io.of('/chat').authorization(function (handshakeData, callback) {

            Sio.getSession(handshakeData, callback);

        }).on('connection', function (socket) {

            var user;
            user = socket.handshake.session !== undefined ? socket.handshake.session.user : undefined;


            if (user) {

                console.log("\n Connexion au chat de " + user.username + ".");
                //console.log(socket.handshake.foo);

                socket.join('Global'); // join global room

                socket.broadcast.to('Global').emit('newusr', user);



                socket.on('whoami', function (no_data, callback) {
                    try {
                        callback(user);
                    } catch (ignore) {}
                });


                socket.on('subscribe', function (room_name, callback) {
                    socket.join(room_name);
                    socket.broadcast.emit('user_joined_a_room', room_name);
                    callback();
                });
                socket.on('unsubscribe', function (room_name, callback) {
                    socket.leave(room_name);
                    callback();
                });


                socket.on('get_rooms_list', function (no_data, callback) {
                    try {
                        callback(Sio.io.sockets.manager.rooms);
                    } catch (ignore) {}
                });



                socket.on('get_userlist', function (current_room, callback) {
                    var u, liste_a_envoyer, clients;
                    console.log("\nget_userslists\n\n");

                    liste_a_envoyer = {};

                    if (!current_room) {
                        current_room = 'Global'; // La room principale (globale) s'appelle '' (chaine vide) (défini par socket.io)
                    }

                    clients = Sio.io.of('/chat').clients(current_room);

                    clients.forEach(function (sock) {
                        if (sock.handshake.session) {
                            u = sock.handshake.session.user;
                            liste_a_envoyer[u.id] = u;
                        }
                    });
                    try {
                        callback(null, liste_a_envoyer);
                    } catch (ignore) {}

                });

                socket.on('get_messages', function (room_name, callback) {
                    
                    if (room_name) {
                        Rooms.getMessages(room_name, function (err, list) {
                            callback(null, list);
                        });
                    }
                });



                socket.on('message', function (message) {
                    message.user = user;
                    message.date = new Date();
                    console.log("\n\n\nNouveau message dans le chat :  " + message.message + " de " + message.user.username + "\n\n\n");
                    socket.broadcast.emit('message', message);
                    socket.emit('message', message);
                    message.content = message.message;
                    Rooms.addMessage(message.for, message);
                });

                socket.on('disconnect', function () {
                    console.log("\n\n\tDisconnect chat " + user.username + "\n\n");
                    socket.broadcast.emit('leave', user);
                });
            }
        });

        Sio.io.of('/documents').authorization(function (handshakeData, callback) {

            Sio.getSession(handshakeData, callback);

        }).on('connection', function (socket) {

            var user;
            user = socket.handshake.session !== undefined ? socket.handshake.session.user : undefined;


            if (user) {

                console.log("\n Connexion aux documents de " + user.username + ".");
                //console.log(user);
                //console.log(socket.handshake.foo);
                socket.on("get_group_documents", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des documents par " + user.username);
                    //News.find_all(function (err, list) {
                    //    callback(err, list);
                    //});
                    var groupMapper = new String(user.project.id);
                    console.log("Group Mapper: " + groupMapper);
                    var group, data, pad;
                    request(Sio.buildEtherpadUrl('createGroupIfNotExistsFor') + 'groupMapper=' + groupMapper , function (err, response, body) {
                        if (err) {
                            console.log(err);
                        } else {
                            data = JSON.parse(body);
                            group = data;
                        }


                        console.log(group);
                        if (!user.etherpad) {
                            user.etherpad = {};
                        }
                        user.etherpad.groupID = group.data.groupID;


                        var docs = [];

                        var listOfPads;
                        request(Sio.buildEtherpadUrl('listPads') + 'groupID=' +  group.data.groupID, function (err, response, body) {
                            if (err) {
                                console.log(err);
                            } else {
                                data = JSON.parse(body);
                                listOfPads = data;
                            }
                            console.log(listOfPads);
                            var padID, revisionsCount;
                            async.each(listOfPads.data.padIDs, function (padID, next) {

                                request(Sio.buildEtherpadUrl('getRevisionsCount') + 'padID=' + padID, function (err, response, body) {
                                    revisionsCount = JSON.parse(body);
                                    console.log(revisionsCount);
                                    if (revisionsCount.message === 'ok') {
                                        revisionsCount = revisionsCount.data.revisions;
                                    } else {
                                        revisionsCount = 0;
                                    }
                                    console.log('revisions: ' + revisionsCount);
                                    request(Sio.buildEtherpadUrl('getHTML') + 'padID=' + padID + '&rev=' + revisionsCount, function (err, response, body) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            data = JSON.parse(body);
                                            if (data.message === 'ok') {
                                                pad = {};
                                                pad.name = padID.split('$')[1];
                                                pad.content = data.data.html;
                                                pad.user = user;
                                                if (padID.split('.')[0] === 'g') {
                                                    pad.isProjectPad = true;
                                                }
                                                //console.log(pad);
                                                docs.push(pad);
                                            }
                                        }
                                        next();
                                    });
                                });
                            }, function (error) {
                                console.log("fin des appels");
                                callback(null, docs); // TODO
                            });
                        });
                    });
                });


                socket.on("get_public_documents", function (no_data, callback) {
                    console.log("Sio: Demande de la liste des autres documents par " + user.username);
                    //News.find_all(function (err, list) {
                    //    callback(err, list);
                    //});

                    var data, pad, docs, listOfPads, command;
                    docs = [];

                    // extrait les pads publiques directement depuis MySQL (etherpad e permet pas de le faire au travers de l'api)
                    command = "mysql -uetherpad -petherpad etherpad -e 'select store.key from store'   | grep -Eo '^pad:[^:]+'   | sed -e 's/pad://'   | sort   | uniq -c   | sort -rn   | awk '{if ($1!=\"2\") {print $2 }}'";

                    exec(command, function (err, stdout, stderr) {
                        console.log('\tEXEC');
                        docs = stdout.split('\n');

                        callback(null, docs);
                    });

                });

                socket.on('createGroupPad', function (name, callback) {
                    request(Sio.buildEtherpadUrl('createGroupPad') + 'groupID=' + user.etherpad.groupID + '&padName=' + name, function (err, response, body) {
                        if (err) {
                            console.log(err);
                        } else {
                            var data = JSON.parse(body);
                            console.log(data);
                        }
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



exports.Sio = Sio;


