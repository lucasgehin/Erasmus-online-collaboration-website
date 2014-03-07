/*jslint browser:true*/
/*global $*/
var resize_chat, $load_img, load_count, load_start, load_end;

resize_chat = function () {
    "use strict";
    var height_chat;
    height_chat = $(window).height() - $('.navbar').height() * 1.45;
    $("#chat").height(height_chat);
};

resize_chat();

$(window).on("resize", function () {
    "use strict";
    resize_chat();
});




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