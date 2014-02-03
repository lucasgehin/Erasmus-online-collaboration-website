(function() {
  var Events, Exception, db;

  db = require('../models');

  Exception = require('./Exception').Exception;


  /*
  
    Controlleur gérant les Events
   */

  Events = (function() {
    function Events() {}

    Events.find_all = function(callback) {
      var query;
      query = db.Event.findAll({
        include: [db.User, db.Status, db.Project]
      });
      query.success(function(Events) {
        return callback(null, Events);
      });
      return query.error(function(err) {
        console.log("Events@find_all: " + err);
        return callback(err, null);
      });
    };

    Events.find_by_id = function(id, callback) {
      var err, query;
      if (typeof id === "number") {
        id = parseInt(id);
        query = db.Event.find(id);
        query.success(function(user) {
          return callback(null, user);
        });
        return query.error(function(err) {
          console.log("Events@find_all: " + err);
          return callback(err, null);
        });
      } else {
        err = new Exception("Users@find_by_id: Id should be an integer in range  [0..n], |" + id + "| given. ", 1);
        return callback(err, null);
      }
    };

    Events.find_by_title = function(title_param, callback) {
      var query;
      if (typeof title_param === "string") {
        query = db.Event.find({
          where: {
            title: title_param
          }
        });
        query.success(function(user) {
          return callback(null, user);
        });
        return query.error(function(err) {
          console.log("Events@find_by_title: " + err);
          return callback(err, null);
        });
      }
    };

    return Events;

  })();

  exports.Events = Events;

}).call(this);
