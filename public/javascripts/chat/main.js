/*jslint browser:true*/
/*global $*/
var resize_chat, $load_img, load_count, load_start, load_end, can_scroll, previous_scroll_max;

resize_chat = function () {
    "use strict";
    var height_chat, height_chat_tools;
    height_chat = $(window).height() - $('.navbar').height() * 1.55;
    height_chat_tools = $("#chat-tools").height();
    $("#chat").height(height_chat);
    $(".people, .room").height(height_chat - (height_chat_tools * 1.5));
    $(".chat_window").height(height_chat - (height_chat_tools * 3));
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


/*Scroll automatique*/

$(".chat_window").scroll(function () {
    "use strict";
    var elem = $(".chat_window")[0];
    can_scroll = (elem.scrollTop === elem.scrollTopMax);
});

previous_scroll_max = 0;

function scrollMsg() {
    "use strict";
    var elem, height;
    elem = $(".chat_window")[0];
    height = elem.scrollHeight;

    if (can_scroll || previous_scroll_max === 0) {
        $('.chat_window').clearQueue().animate({
            scrollTop: height
        }, 1000);
        previous_scroll_max = elem.scrollTopMax;
    }

}