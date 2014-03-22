

var async, data, db, err, find_user, news, _i, _len;

async = require('async');

db = require('../models');

data = [
    {
        name: 'Global'
    }
];


/*

        Code d'injection
 */

var room, create;
for (_i = 0, _len = data.length; _i < _len; _i++) {
    room = data[_i];
    try {
        create = db.Room.create(room);
        create.success(function (new_news) {
            console.log("created: " + new_news.name);
        });
        create.error(function(err) {
            console.log("Erreur pour " + new_news.nome + ":");
            console.log(err);
        });
    } catch (_error) {
        err = _error;
        console.log("Erreur pour " + room.name + " :");
        console.log(err);
    }
}
