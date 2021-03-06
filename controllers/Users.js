
var Exception, Password, Users, db;

db = require('../models');

Exception = require('./Exception').Exception;

Password = require('password-hash');


/*
 
    Controlleur gérant les utilisateurs
 */

Users = (function () {

    function Users() {}

    Users.find_all = function (callback) {
        var query;
        query = db.User.findAll({
            include: [db.Country, db.Status, db.Project, db.Image]
        });
        query.success(function (users) {
            return callback(null, users);
        });
        return query.error(function (err) {
            console.log("Users@find_all: " + err);
            return callback(err, null);
        });
    };

    Users.find_by_id = function (id, callback) {
        var err, query;
        if (typeof id === "number") {
            id = parseInt(id, 10);
            query = db.User.find({
                where: {
                    id: id
                },
                include: [db.Country, db.Status, db.Project, db.Image]
            });
            query.success(function (user) {
                callback(null, user);
            });
            query.error(function (err) {
                console.log("Users@find_all: " + err);
                callback(err, null);
            });
        } else {
            err = new Exception("Users@find_by_id: Id should be an integer in range   [0..n], |" + id + "| given. ", 1);
            return callback(err, null);
        }
    };

    Users.find_by_username = function (username_param, callback) {
        var query;
        if (typeof username_param === "string") {
            query = db.User.find({
                where: {
                    username: username_param
                },
                include: [db.Status, db.Country, db.Project, db.Image]
            });
            query.success(function (user) {
                user.status = user.statu;
                delete user.statu;
                callback(null, user);
            });
            query.error(function (err) {
                console.log("Users@find_all: " + err);
                callback(err, null);
            });
        }
    };

    Users.find_by_mail = function (mail_param, callback) {
        var query;
        if (typeof mail_param === "string") {
            query = db.User.find({
                where: {
                    mail: mail_param
                }
            });
            query.success(function (user) {
                callback(null, user);
            });
            query.error(function (err) {
                console.log("Users@find_all: " + err);
                callback(err, null);
            });
        }
    };

    Users.connect = function (request, response) {

        var password, query, user_inconnu, username;

        username = request.param("username");
        password = request.param("password");

        console.log("Tentative de connection de : " + username + ":" + password + " .");
        if (typeof username === 'string') {
            username = username.trim();
            user_inconnu = function () {
                response.end(JSON.stringify({
                    response: false
                }));
                console.log("Utilisateur " + username + " inconnu.");
            };
            query = Users.find_by_username(username, function (err, user) {
                if (err) {
                    response.end(err);
                    console.log(err);
                } else if (user !== null) {
                    console.log("Utilisateur " + username + " existant.");
                    if (Password.verify(password, user.password)) {
                        console.log("Mot de passe ok pour " + username + ".");
                        response.end(JSON.stringify({
                            response: true
                        }));
                        request.session.connected = true;
                        request.session.user = user;
                        console.log(username + ": connecté");
                    } else {
                        user_inconnu();
                    }
                } else {
                    user_inconnu();
                }
            });
        }
    };

    Users.disconnect = function (request, response) {
        if ((request.session !== null) && request.session.connected) {
            request.session.destroy();
        }
        return response.redirect("/");
    };

    return Users;

})();

exports.Users = Users;
