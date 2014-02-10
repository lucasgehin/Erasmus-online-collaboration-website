(function() {
  var $calendar, Events, calendar_started, events_fetched, init_calendar, is_editing, load_all_events, socket, start;

  $calendar = null;

  $(document).ready(function() {
    var $cp, apply_color;
    $calendar = $('#calendar');
    start();
    $cp = $('#color-picker');
    $cp.ColorPicker({
      onSubmit: function(hsb, hex, rgb, el) {
        return apply_color(hsb, hex, rgb, el);
      },
      onChange: function(hsb, hex, rgb) {
        return apply_color(hsb, hex, rgb, $cp);
      },
      onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onBeforeShow: function() {
        return apply_color(null, '6BA5C2', null, $cp);
      }
    }).bind('keyup', function() {
      return $(this).ColorPickerSetColor(this.value);
    });
    return apply_color = function(hsb, hex, rgb, el) {
      $(el).val(hex + " | Your text will look like this.");
      return $(el).css('background-color', "#" + hex);
    };
  });


  /*
                Sockets
   */

  calendar_started = false;

  events_fetched = false;

  socket = null;

  start = function() {
    socket = io.connect("/calendar");
    socket.on('connect', function() {
      console.log("IO: Connected!");
      load_end();
      if (!calendar_started) {
        return init_calendar();
      }
    });
    socket.on("message", function(data) {
      return console.log(data);
    });
    socket.on('connecting', function() {
      console.log("IO: Connecting to /calendar...");
      return load_start();
    });
    return socket.on('update_event', function(event) {
      load_start();
      if (is_editing && event.is_editable) {
        event.editable = true;
      }
      Events.replace(event);
      return load_end();
    });
  };


  /*
            FULL CALENDAR
   */

  load_all_events = function() {
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
      events_fetched = true;
      return load_end();
    });
  };

  init_calendar = function() {
    var button_edit_calendar, height_calendar, options;
    calendar_started = true;
    $calendar = $('#calendar');
    height_calendar = $(window).height() - $('.navbar').height() * 1.6;
    options = {
      height: height_calendar,
      firstDay: 1,
      defaultView: 'agendaWeek',
      ignoreTimezone: false,
      header: {
        left: '',
        center: '',
        right: 'today prev,next month,agendaWeek,agendaDay'
      },
      buttonText: {
        prev: '←',
        next: '→',
        prevYear: '«',
        nextYear: '»',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
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
      eventResize: function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
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
      eventClick: function(event, jsEvent, view) {
        var $scope_popup;
        $scope_popup = $('#popup-show-event').scope();
        return $scope_popup.show(event);
      },
      viewRender: function(view, element) {
        $calendar.fullCalendar('removeEvents');
        return load_all_events();
      }
    };
    $calendar.fullCalendar(options);
    button_edit_calendar = "<button id='edit-calendar' class='btn btn-success' >\n  <span class=\"glyphicon glyphicon-edit\">&emsp;Edit</span>\n</button>";
    $('.fc-header-left').html(button_edit_calendar);
    return $('#edit-calendar').on('click', function() {
      return toggle_edit();
    });
  };


  /*
  
            CLASS EVENTS
   */

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

    Events.update = function(event, callback) {
      load_start();
      return socket.emit('update_event', event, function(err, response) {
        if (err != null) {
          alert("An error has occured... maybe your internet connection ?");
        } else {
          if (response.response !== true) {
            alert("This event has not been saved. Maybe you dont have rights on it ?");
          }
        }
        load_end();
        if ((callback != null) && response.response === true) {
          return callback(event);
        }
      });
    };

    Events.replace = function(event) {
      $calendar.fullCalendar('removeEvents', event.id);
      return $calendar.fullCalendar('renderEvent', event);
    };

    return Events;

  })();


  /*
                ANGULAR CONTROLLERS
   */

  this.popup_show_event = function($scope, $sce) {
    var $popup_show, event_backup;
    $scope.disabled = true;
    $scope.priority = 1;
    event_backup = null;
    $popup_show = $("#popup-show-event");
    $scope.show = function(event) {
      $scope.title = event.title;
      $scope.description = $sce.trustAsHtml(event.description);
      if (event.start != null) {
        $scope.start = moment(event.start).format('MMMM Do YYYY, h:mm:ss a');
      }
      if (event.end != null) {
        $scope.end = moment(event.end).format('MMMM Do YYYY, h:mm:ss a');
      }
      $scope.priority = event.priority;
      $scope.disabled = !event.editable;
      event_backup = event;
      $scope.$apply();
      $popup_show.modal('show');
      return toggle_edit();
    };
    $scope.edit = function() {
      var scope;
      scope = $('#popup-edit-event').scope();
      $scope.close();
      scope.edit(event_backup);
      return null;
    };
    return $scope.close = function() {
      toggle_edit();
      $popup_show.modal('hide');
      return null;
    };
  };

  this.popup_edit_event = function($scope) {
    var $popup_edit, event_backup;
    $scope.title = "";
    $scope.priority = 1;
    $popup_edit = $("#popup-edit-event");
    event_backup = null;
    $scope.color_map = [
      {
        name: "Insignificant - Gray",
        color: '#676767',
        id: 0
      }, {
        name: "Normal - Blue",
        color: '#6BA5C2',
        id: 1
      }, {
        name: "Important - Orange",
        color: '#FFA12F',
        id: 2
      }, {
        name: "Mandatory - Red",
        color: '#FF2B2B',
        id: 3
      }
    ];
    $scope.color = 1;
    $scope.edit = function(event) {
      var picker_date_end, picker_date_start, picker_time_end, picker_time_start, unix_time_end, unix_time_start;
      event_backup = event;
      $scope.title = event.title;
      $scope.priority = event.priority;
      $popup_edit.modal('show');
      toggle_edit();
      picker_date_start = $popup_edit.find("#date-start").pickadate().pickadate("picker");
      picker_time_start = $popup_edit.find("#time-start").pickatime().pickatime('picker');
      picker_date_end = $popup_edit.find("#date-end").pickadate().pickadate('picker');
      picker_time_end = $popup_edit.find("#time-end").pickatime().pickatime('picker');
      unix_time_start = new Date(event.start);
      if (event.end != null) {
        unix_time_end = new Date(event.end);
      }
      if (unix_time_end != null) {
        picker_date_start.set("max", unix_time_end);
      }
      picker_date_start.set("select", unix_time_start);
      if (unix_time_end != null) {
        picker_time_start.set("max", unix_time_end);
      }
      picker_time_start.set("select", unix_time_start);
      picker_date_end.set('min', unix_time_start);
      picker_date_end.set('select', unix_time_end);
      picker_time_end.set('min', unix_time_start);
      picker_time_end.set('select', unix_time_end);
      return CKEDITOR.instances.editor.setData(event.description);
    };
    $scope.save = function() {
      var date_end, date_start, event, select_date_end, select_date_start, select_time_end, select_time_start;
      alert($scope.color);
      event = event_backup;
      event.title = $scope.title;
      event.description = CKEDITOR.instances.editor.getData();
      select_date_start = $('#date-start').pickadate().pickadate('picker').get('select');
      select_time_start = $('#time-start').pickatime().pickatime('picker').get('select');
      select_date_end = $('#date-end').pickadate().pickadate('picker').get('select');
      select_time_end = $('#time-end').pickatime().pickatime('picker').get('select');
      date_start = new Date(select_date_start.pick);
      date_start.setHours(select_time_start.hour);
      date_start.setMinutes(select_time_start.mins);
      date_end = new Date(select_date_end.pick);
      date_end.setHours(select_time_end.hour);
      date_end.setMinutes(select_time_end.mins);
      event.start = date_start.toJSON();
      event.end = date_end.toJSON();
      console.log(date_start.toJSON());
      console.log(date_end.toJSON());
      event.priority = $scope.priority;
      Events.update(event, function(event) {
        var scope;
        scope = $('#popup-show-event').scope();
        scope.show(event);
        return $scope.close();
      });
      return null;
    };
    return $scope.close = function() {
      $popup_edit.modal('hide');
      toggle_edit();
      return null;
    };
  };

  is_editing = false;

  this.toggle_edit = function(skip) {
    var $btn, event, list, _i, _len, _results;
    is_editing = !is_editing;
    $btn = $('#edit-calendar span');
    if (is_editing) {
      $btn.html('&nbsp;&nbsp;Stop Editing');
      $btn.toggleClass('glyphicon-edit');
      $btn.toggleClass('glyphicon-check');
    } else {
      $btn.html('&nbsp;&nbsp;Edit');
      $btn.toggleClass('glyphicon-edit');
      $btn.toggleClass('glyphicon-check');
    }
    list = $calendar.fullCalendar('clientEvents');
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      event = list[_i];
      if (is_editing) {
        if (event.is_editable === true) {
          event.editable = true;
        }
      } else {
        if (event.is_editable === true) {
          event.editable = false;
        }
      }
      _results.push(Events.replace(event));
    }
    return _results;
  };

}).call(this);
