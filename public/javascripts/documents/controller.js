/*jslint browser: true*/
/*global $, jQuery, io, angular, moment, prompt*/

var $load_img, Documents_list, load_count, sanitize, socket, load_start, load_end;

Documents_list = [];

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

socket = io.connect("/documents");

socket.on('connecting', function () {
    "use strict";
    console.log("IO: Connecting to /documents...");
    load_start();
});
socket.on('connect', function () {
    "use strict";
    console.log("IO: Connected!");
    load_end();
});

socket.on("message", function (data) {
    "use strict";
    console.log(data);
});


sanitize = function (event, jqueryObject) {
    "use strict";
    event.preventDefault();
    event.stopPropagation();
    if (jqueryObject.is(":animated")) {
        jqueryObject.stop();
        jqueryObject.clearQueue();
    }
};



$("#createGroupPad").on('click', function (event) {
    "use strict";
    var name = prompt('Enter new document name:');
    socket.emit('createGroupPad', name, function (err, response) {
        console.log(err);
        console.log(response);
    });
});



this.Documents_Management = function ($scope, $sce) {
    "use strict";
    $scope.list = function () {
        return Documents_list;
    };

    $scope.importants = [];
    $scope.fromTeachers = [];
    $scope.fromStudents = [];
    $scope.others = [];
    $scope.selected = {};

    $scope.get_documents_list = function () {
        console.log("Getting documents list");
        //load_start();
        socket.emit('get_group_documents', null, function (err, response) {
            //load_end();
            console.log(response);
            if (response !== null) {
                Documents_list = response;
                console.log(response);
            }
            if (Documents_list.length === 0 || err) {
                Documents_list.push({
                    id: -1,
                    title: "There is nothing here yet :(",
                    content: "You can add a document in the 'Documents' section.'",
                    createdAt: new Date(),
                    important: true
                });
            }
            var important, myproject, student;
            for (var i = 0; i < Documents_list.length; i++) {
                important = Documents_list[i].important;
                myproject = Documents_list[i].isProjectPad;
                console.log(myproject);
                student = Documents_list[i].user.statu.name === User.type;
                console.log(student);
                if (important) {
                    $scope.importants.push(Documents_list[i]);
                } else if ( myproject && student) {
                    $scope.fromStudents.push(Documents_list[i]);
                } else if (myproject) {
                    $scope.fromTeachers.push(Documents_list[i]);
                } else {
                    $scope.others.push(Documents_list[i]);
                }
            };
            $scope.$apply();
        });
        socket.emit('get_public_documents', null, function (err, response) {
            //load_end();
            console.log(response);
            if (response !== null) {
                $scope.others = [];
                for (var i = 0; i < response.length-1; i++) {
                    $scope.others.push({
                        name: response[i],
                    });
                };
            }
            if ($scope.others.length === 0 || err) {
                $scope.others.push({
                    id: -1,
                    name: "There is nothing here yet :(",
                    //content: "You can add a document in the 'Documents' section.'",
                    createdAt: new Date(),
                });
            }             

            $scope.$apply();
        });
    };
    socket.on('connect', function () {
        $scope.get_documents_list();
    });
    $scope.show = function (doc) {
        var popup;
        $scope.selected = doc;
        //$scope.selected.date = doc.date;
        $scope.selected.contentHTML = $sce.trustAsHtml(doc.content);
        popup = document.querySelector("#popup-view");
        $(popup).modal();
    };

    $scope.edit = function  (doc) {
        //console.warn(doc);
        window.open("http://localhost:9001/p/" + doc.name);
        //window.open("https://docs.ipviope.tk/p/" + doc.name);
    };
};





angular.module('documents', ['ngAnimate']).
    filter('htmlToPlaintext', function () {
        "use strict";
        var parser = document.createElement('div');
        return function (text) {
            var str = String(text).replace(/<[^>]+>/gm, '');
            //str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            parser.innerHTML = str;
            str = parser.textContent;
            parser.textContent = '';
            if (!str || str === 'null') {
                str = '';
            }
            return str;
        };
    });