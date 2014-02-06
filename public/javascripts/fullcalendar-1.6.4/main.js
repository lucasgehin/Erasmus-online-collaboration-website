(function() {
  var $load_img, load_count;

  $(document).ready(function() {
    return load_start();
  });

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

}).call(this);
