(function() {
  var $calendar, Events, init_calendar, socket, start;

  $calendar = null;

  $(document).ready(function() {
    $calendar = $('#calendar');
    return start();
  });

  socket = null;

  start = function() {
    socket = io.connect("/calendar");
    socket.on('connect', function() {
      console.log("IO: Connected!");
      load_end();
      init_calendar();
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
    socket.on('connecting', function() {
      console.log("IO: Connecting to /calendar...");
      return load_start();
    });
    return socket.on('update_event', function(event) {
      return Events.replace(event);
    });
  };

  init_calendar = function() {
    var height_calendar, options;
    $calendar = $('#calendar');
    height_calendar = $(window).height() - $('.navbar').height() * 1.6;
    options = {
      height: height_calendar,
      defaultView: 'agendaWeek',
      ignoreTimezone: false,
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next month,agendaWeek,agendaDay'
      },
      dragRevertDuration: 2000,
      eventRevertDuration: 3000,
      eventAfterAllRender: function() {
        return load_end();
      },
      eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
        if (!event.editable) {
          return revertFunc();
        } else {
          if (true) {
            return Events.update(event);
          } else {
            return revertFunc();
          }
        }
      },
      eventResize: function(event, revertFunc) {}
    };
    return $calendar.fullCalendar(options);
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

    Events.update = function(event) {
      load_start();
      return socket.emit('update_event', event, function(err, response) {
        if (err != null) {
          alert("An error has occured... maybe your internet connection ?");
        } else {
          if (response.response !== true) {
            alert("This event has not been saved. Maybe you dont have rights on it ?");
          }
        }
        return load_end();
      });
    };

    Events.replace = function(event) {
      $calendar.fullCalendar('removeEvents', event.id);
      return $calendar.fullCalendar('renderEvent', event);
    };

    return Events;

  })();

}).call(this);
