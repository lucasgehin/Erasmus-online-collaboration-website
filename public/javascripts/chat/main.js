/*jslint browser:true*/
/*global $*/
var resize_chat, $load_img, load_count, load_start, load_end, can_scroll, previous_scroll_max, delay;

resize_chat = function () {
    "use strict";
    var height_chat, height_chat_tools;
    height_chat = $(window).height() - $('.navbar').height() * 1.55;
    height_chat_tools = $("#chat-tools").height();
    $("#chat").height("100%");
    $(".people, .room").height(height_chat - (height_chat_tools * 1.5));
    $(".chat_window").height(height_chat - (height_chat_tools * 3));
};

resize_chat();

$(window).on("resize", function () {
    "use strict";
    resize_chat();
});


$(window).load(function () {
    $(".new_message input").eq(0).focus();
});



load_count = 0;
delay = null;

$load_img = $('#ajaxloader');

load_start = function () {
    "use strict";
    if (load_count === 0) {
        $load_img.fadeIn('fast');
    }
    load_count += 1;
    delay = setTimeout(load_end, 4000);
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

function rewatch_scroll() {
    "use strict";
    $(".chat_window").scroll(function () {
        var $chat_window = $(this)[0];
        //console.log($chat_window.scrollTop + "|" + $chat_window.scrollTopMax);
        $($chat_window).attr('can_scroll', ($chat_window.scrollTop === $chat_window.scrollTopMax));
    });
}



function scrollMsg(room_name) {
    "use strict";

    var $elem, height, can_scroll, $chat_window;
    $elem = $(".tab-pane[name='" + room_name + "']");
    $chat_window = $elem.find('.chat_window')[0];

    rewatch_scroll();

    height = $chat_window.scrollHeight;
    can_scroll = $($chat_window).attr('can_scroll');

    if (can_scroll === undefined) {
        can_scroll = false;
    }
    can_scroll = (can_scroll === "true");

    previous_scroll_max = $($chat_window).attr('previous_scroll_max');
    if (!previous_scroll_max) {
        previous_scroll_max = 0;
    }
    previous_scroll_max = parseInt(previous_scroll_max, 10);



    if ((!!can_scroll) || (previous_scroll_max <= 0)) {
        //console.log("in");
        $($chat_window).clearQueue().animate({
            scrollTop: height
        }, 1000);
        $($chat_window).attr('previous_scroll_max', $chat_window.scrollTopMax);

    }

}

$(document).ready(function () {
    "use strict";
    $(".navbar").removeClass('navbar-fixed-top');
    
});


// create our webrtc connection
window.webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: '',
    // immediately ask for camera access
    autoRequestMedia: false,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: true
});


var defaultVideoWith = "100", defaultVideoHeight = "75";


window.webrtc.on('videoAdded', function (video, peer) {
    console.log('video added', peer);
    var remotes = document.getElementById('remote');
    if (remotes) {
        var d = document.createElement('div');
        d.className = 'videoContainer';
        d.id = 'container_' + window.webrtc.getDomId(peer);
        d.appendChild(video);
        var vol = document.createElement('div');
        vol.id = 'volume_' + peer.id;
        vol.className = 'volume_bar';
        video.fullscreen = false;
        video.onclick = function () {

            if (!video.fullscreen) {
                video.fullscreen = true;
                video.originalOffsetTop = $(video).offset().top;
                video.originalOffsetLeft = $(video).offset().left;
                
                video.style.zIndex = 9999;

                video.style.position = "absolute";
                $(video).offset({
                    top: video.originalOffsetTop, 
                    left: video.originalOffsetLeft
                });
                $(video).animate({
                    width : '100%',
                    height : video.videoHeight + 'px',
                    top: 0,
                    left: 0
                });
            } else {
                video.style.zIndex = 0;
                $(video).animate({
                    width : defaultVideoWith + "px",
                    height : defaultVideoHeight + "px",
                    top: $('.conference').offset().top - $('.conference').height() + 'px',
                    left: video.originalOffsetLeft - defaultVideoWith + 'px'
                }, 400, function () {
                    video.style.top = 0;
                    video.style.left = 0;
                    video.style.position = "relative";
                    video.fullscreen = false;
                });
            }
        };
        d.appendChild(vol);
        remotes.appendChild(d);
    }
    
    var time = timeToShow;
    $('.conference').find('video').each(function () {
        $(this).fadeIn(time);
        time += 250;
    });
});
window.webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var remotes = document.getElementById('remote');
    var el = document.getElementById('container_' + webrtc.getDomId(peer));
    if (remotes && el) {
        remotes.removeChild(el);
    }
});
