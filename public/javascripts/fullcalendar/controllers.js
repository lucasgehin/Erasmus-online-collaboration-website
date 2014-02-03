(function() {
  var $calendar, Events, Events_list, socket, start;

  $calendar = null;

  $(document).ready(function() {
    $calendar = $('#calendar');
    return start();
  });

  Events_list = [];

  socket = null;

  start = function() {
    socket = io.connect("/calendar");
    socket.on('connect', function() {
      console.log("IO: Connected!");
      load_end();
      load_start();
      return Events.find_all(function(err, events) {
        var event, _i, _len;
        if (err != null) {
          load_end();
        }
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          $calendar.fullCalendar('renderEvent', event);
        }
        return load_end();
      });
    });
    socket.on("message", function(data) {
      return console.log(data);
    });
    return socket.on('connecting', function() {
      console.log("IO: Connecting to /calendar...");
      return load_start();
    });
  };

  Events = (function() {
    function Events() {}

    Events.find_all = function(callback) {
      return socket.emit('get_events_list', null, function(err, response) {
        if (err != null) {
          return console.log("Events@find_all: " + err);
        } else {
          return callback(err, response);
        }
      });
    };

    Events.find_by_id = function(id, callback) {
      var err, query;
      if (typeof id === "number") {
        id = parseInt(id);
        query = db.Events.find(id);
        query.success(function(user) {
          return callback(null, user);
        });
        return query.error(function(err) {
          console.log("Events@find_by_id: " + err);
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
        query = db.Events.find({
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

}).call(this);
