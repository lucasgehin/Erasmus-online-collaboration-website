(function() {
  var $calendar, $load_img, load_count, resize_calendar, start;

  $(document).ready(function() {
    load_start();
    return start();
  });

  $calendar = null;

  start = function() {
    var options;
    $calendar = $('#calendar');
    options = {
      defaultView: 'agendaWeek',
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next month,agendaWeek,agendaDay'
      },
      eventAfterAllRender: function() {
        return load_end();
      }
    };
    $calendar.fullCalendar(options);
    resize_calendar();
    return $(window).on('resize', function() {
      return resize_calendar();
    });
  };

  load_count = 0;

  $load_img = $('#ajaxloader');

  this.load_start = function() {
    if (load_count === 0) {
      $load_img.fadeIn('fast');
    }
    return load_count++;
  };

  this.load_end = function() {
    if (load_count > 0) {
      load_count--;
    }
    if (load_count === 0) {
      return $load_img.fadeOut('slow');
    }
  };

  resize_calendar = function() {
    var height_calendar;
    height_calendar = $(window).height() - $('.navbar').height() * 1.6;
    return $("#calendar").fullCalendar('option', 'height', height_calendar);
  };

}).call(this);
