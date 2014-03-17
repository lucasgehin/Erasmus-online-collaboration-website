/*jslint browser: true*/
/*global $*/

var $load_img, load_count, load_start, load_end;


load_count = 0;

$load_img = $('#ajaxloader');

load_start = function () {
    "use strict";
    if (load_count === 0) {
        $load_img.fadeIn('fast');
    }
    load_count += 1;
};

load_end = function () {
    "use strict";
    if (load_count > 0) {
        load_count -= 1;
    }
    if (load_count === 0) {
        $load_img.fadeOut('slow');
    }
};


$(document).ready(function () {
    "use strict";
    load_start();
});
