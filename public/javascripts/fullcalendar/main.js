(function() {
  var $calendar, $load_img, load_count, load_end, load_start, start;

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
    return $calendar.fullCalendar(options);
  };

  load_count = 0;

  $load_img = $('#ajaxloader');

  load_start = function() {
    if (load_count === 0) {
      $load_img.fadeIn('fast');
    }
    return load_count++;
  };

  load_end = function() {
    if (load_count > 0) {
      load_count--;
    }
    if (load_count === 0) {
      return $load_img.fadeOut('slow');
    }
  };

}).call(this);
