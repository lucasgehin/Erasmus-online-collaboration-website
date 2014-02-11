(function() {
  var async, data, date, db, err, event, find_user, _i, _len;

  db = require('../models');

  async = require('async');

  date = new Date();

  data = [
    {
      title: 'Evenement 1',
      decription: "Description de l'evenement n°1",
      allDay: false,
      start: date.setHours(date.getHours() + 1),
      author: 'test_student',
      color: '#6BA5C2'
    }, {
      title: 'Evenement 2',
      decription: "Description de l'evenement n°2",
      allDay: false,
      start: date.setHours(date.getHours() + 2),
      author: 'test_teacher',
      color: '#FFA12F'
    }, {
      title: 'Evenement 3',
      decription: "Description de l'evenement n°3",
      allDay: false,
      start: date.setHours(date.getHours() + 3),
      author: 'test_teacher',
      color: '#6BA5C2'
    }, {
      title: 'Evenement 4',
      decription: "Description de l'evenement n°4",
      allDay: true,
      author: 'test_student',
      color: '#6BA5C2'
    }, {
      title: 'Evenement 5',
      decription: "Description de l'evenement n°5",
      allDay: false,
      start: date.setHours(date.getHours() + 5),
      author: 'test_admin',
      color: '#FF5252'
    }, {
      title: 'Evenement 6',
      decription: "Description de l'evenement n°6",
      allDay: true,
      author: 'test_admin',
      color: '#FF5252'
    }, {
      title: 'Evenement 7',
      decription: "Description de l'evenement n°7",
      allDay: false,
      start: date.setHours(date.getHours() + 7),
      author: 'test_student',
      color: '#8C8C8C'
    }, {
      title: 'Evenement 8',
      decription: "Description de l'evenement n°8",
      allDay: false,
      start: date.setHours(date.getHours() + 8),
      author: 'test_admin',
      color: '#6BA5C2'
    }
  ];

  find_user = function(event, callback) {
    var query;
    query = db.User.find({
      where: {
        username: event.author
      }
    });
    query.success(function(user) {
      event.user = user;
      return callback(null, event);
    });
    return query.error(function(err) {
      console.log("Erreur pour " + event.title + " à la récuperation en BDD de l'username");
      console.log(err);
      return callback(null);
    });
  };

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    event = data[_i];
    try {
      async.parallel({
        event_with_user: function(callback) {
          return find_user(event, callback);
        }
      }, function(err, results) {
        var create, user;
        if (err) {
          console.log("Une erreur est survenue dans async");
          return console.log(err);
        } else {
          user = results.event_with_user.user;
          event = results.event_with_user;
          event.username = null;
          create = db.Event.create(event);
          create.success(function(new_event) {
            new_event.setUser(user);
            return console.log("created: " + new_event.title);
          });
          return create.error(function(err) {
            console.log("Erreur pour " + new_event.title + ":");
            return console.log(err);
          });
        }
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pendant l'injection (catch)");
      console.log(err);
    }
  }

}).call(this);
