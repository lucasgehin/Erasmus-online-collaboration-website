/*slint browser: true*/
/*global $, window*/
var resize_chat;

resize_chat = function () {
    "use strict";
    var height_chat;
    height_chat = $(window).height() - $('.navbar').height() * 1.45;
    return $("#chat").height(height_chat);
};

resize_chat();

$(window).on("resize", function () {
    "use strict";
    resize_chat();
});


