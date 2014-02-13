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
        include: [
          {
            model: db.User,
            include: [db.Status]
          }, db.Status, db.Project
        ]
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
        query = db.Event.find({
          where: {
            id: id
          },
          include: [
            {
              model: db.User,
              include: [db.Status]
            }, db.Status, db.Project
          ]
        });
        query.success(function(event) {
          return callback(null, event);
        });
        return query.error(function(err) {
          console.log("Events@find_all: " + err);
          return callback(err, null);
        });
      } else {
        err = new Exception("Events@find_by_id: Id should be an integer in range  [0..n], |" + id + "| given. ", 1);
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

    Events.find_next_events = function(callback) {
      return callback(null);
    };

    Events.update = function(event, callback) {
      var id;
      id = parseInt(event.id);
      return Events.find_by_id(id, function(err, db_event) {
        var query;
        if (err != null) {
          console.log(err);
          callback(err, null);
        }
        if (db_event != null) {
          query = db_event.updateAttributes({
            title: event.title,
            description: event.description,
            allDay: event.allDay,
            start: event.start,
            end: event.end,
            url: event.url,
            color: event.color,
            priority: event.priority,
            StatuId: event.StatuId,
            ProjectId: event.ProjectId
          });
          query.success(function(db_event) {
            return Events.find_by_id(db_event.id, function(err, event_with_all_data) {
              return callback(null, event_with_all_data);
            });
          });
          return query.error(function(err) {
            if (err != null) {
              console.log(err);
              return callback(err, null);
            }
          });
        }
      });
    };

    return Events;

  })();

  exports.Events = Events;

}).call(this);
