/*jslint browser: true*/
/*global $*/


var start;

start = function () {
    "use strict";
    var liste_logos, shake_logo, slide_time, start_shake_logos;
    $(".logos img[id!='logo-rotate']").on("mouseover", function () {
        if (!$(this).is(":animated")) {
            return $(this).effect("shake", {
                distance: 1,
                times: 3
            });
        }
    });
    $(".logo-function").on("mouseenter", function () {
        return $(this).animate({
            "border-top-left-radius": "-=25",
            "border-top-right-radius": "-=25",
            "border-bottom-left-radius": "-=25",
            "border-bottom-right-radius": "-=25"
        });
    });
    $(".logo-function").on("mouseleave", function () {
        return $(this).animate({
            "border-top-left-radius": "+=25",
            "border-top-right-radius": "+=25",
            "border-bottom-left-radius": "+=25",
            "border-bottom-right-radius": "+=25"
        });
    });
    liste_logos = [
        {
            id: "#logo-ipl"
        }, {
            id: "#logo-inh"
        }, {
            id: "#logo-metropolia"
        }, {
            id: "#logo-udl"
        }, {
            id: "#logo-gcu"
        }, {
            id: "#logo-cuot"
        }, {
            id: "#logo-unimi"
        }
    ];
    shake_logo = function (id, time) {
        return setTimeout(function () {
            return $(id).effect("shake", {
                distance: 1,
                times: 3
            });
        }, time * 100);
    };
    start_shake_logos = function () {

        var i, logo, i_ref, ref, results;
        results = [];
        for (i = i_ref = 0, ref = liste_logos.length - 1; 0 <= ref ? i_ref <= ref : i_ref >= ref; i = 0 <= ref ? ++i_ref : --i_ref) {
            logo = liste_logos[i];
            results.push(shake_logo(logo.id, i + 1));
        }
        return results;
    };
    start_shake_logos();
    setInterval(function () {
        return start_shake_logos();
    }, 10000);
    slide_time = 600;
    $("#titre").on("click", function (e) {
        var top;
        e.preventDefault();
        e.stopPropagation();
        top = 0;
        return $("html, body").animate({
            scrollTop: top
        }, slide_time);
    });
    $("#about-link").on("click", function (e) {
        var top;
        top = $("#about").offset().top - 50;
        return $("html,body").animate({
            scrollTop: top
        }, slide_time);
    });
    return $("#contact-link").on("click", function (e) {
        var top;
        top = $(".contact").eq(0).offset().top;
        return $("html,body").animate({
            scrollTop: top
        }, slide_time);
    });
};

$(window).on("load", start);
