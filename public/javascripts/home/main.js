/*jlint browser: true */
/*global $ */

var decallage_y, sanitise, selector, slide_time;

slide_time = 600;

decallage_y = -$(".navbar").eq(0).height() - 1;

selector = "html, body";

$("#top-link").on("click", function (e) {
    "use strict";
    var target;
    sanitise(e, selector);
    target = $(".news-section").offset().top + decallage_y;
    return $("html, body").animate({
        scrollTop: target
    }, slide_time);
});

$("#docs-link").on("click", function (e) {
    "use strict";
    var target;
    sanitise(e, selector);
    target = $(".pinned-docs-section").offset().top + decallage_y;
    return $("html, body").animate({
        scrollTop: target
    }, slide_time);
});

$("#projects-link").on("click", function (e) {
    "use strict";
    var target;
    sanitise(e, selector);
    target = $(".projects-link-section").offset().top + decallage_y;
    return $("html,body").animate({
        scrollTop: target
    }, slide_time);
});

$("#users-link").on("click", function (e) {
    "use strict";
    var target;
    sanitise(e, selector);
    target = $(".users-link-section").offset().top + decallage_y;
    return $("html,body").animate({
        scrollTop: target
    }, slide_time);
});

sanitise = function (event, selector) {
    "use strict";
    event.preventDefault();
    event.stopPropagation();
    if ($(selector).is(":animated")) {
        $(selector).stop();
        return $(selector).clearQueue();
    }
};

$(document).ready(function () {
    $('#avatar-field').imgAreaSelect({
        handles: true,
        //onSelectEnd: someFunction
    });
});