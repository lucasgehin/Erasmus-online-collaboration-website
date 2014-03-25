/*jslint browser: true */

/*global $ */

var input, img, filesToUpload, file, canvas, ctx, MAX_WIDTH, MAX_HEIGHT, width, height, dataurl, avatarResult;
input = document.getElementById('avatar-field');

img = document.createElement('img');


input.onchange = function () {
    "use strict";
    //console.log(e);
    filesToUpload = input.files;
    file = filesToUpload[0];
    img.src = window.URL.createObjectURL(file);
    img.onload = function () {

        //-canvas = document.getElementById('avatar-renderer');
        canvas = document.createElement('canvas');
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        MAX_WIDTH = 300;
        MAX_HEIGHT = 300;
        width = img.width;
        height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        dataurl = canvas.toDataURL("image/jpeg");

        img = document.getElementById('avatar-renderer');
        img.src = dataurl;
        //Post dataurl to the server with AJAX

        function change(imgClipped, selection) {
            if (!selection) {
                selection = window.picker.getSelection();
            }
            if (!imgClipped) {
                imgClipped = img;
            }
            var result = document.getElementById('avatar-result');
            ctx = result.getContext('2d');
            result.width = result.width;
            result.width = selection.width;
            result.height = selection.height;
            ctx.drawImage(imgClipped,  selection.x1, selection.y1, selection.width, selection.height, 0, 0, selection.width, selection.height);
        }

        window.picker = $('#avatar-renderer').imgAreaSelect({
            handles: true,
            aspectRatio: '1:1',
            fadeSpeed: true,
            show: true,
            instance: true,
            onInit: function () {
                var x1, x2, y1, y2;
                x1 = (img.width / 2) - (img.width / 4);
                x2 = (img.width / 2) + (img.width / 4);
                y1 = (img.height / 2) - (img.height / 4);
                y2 = (img.height / 2) + (img.height / 4);
                window.picker.setSelection(
                    x1,
                    y1,
                    x2,
                    y2
                );
                window.picker.update();
                change();

            },
            onSelectChange: change
        });

    };
};

function convertImgToBase64(image, callback) {
    "use strict";
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image();
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/jpeg');
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = image.src;
}

function accountController($scope, $http) {
    "use strict";
    var query, data_hd, data_thumbnail;

    $scope.update = function () {

        convertImgToBase64(document.getElementById('avatar-renderer'), function (url) {

            data_hd = url;
            data_thumbnail = document.getElementById('avatar-result').toDataURL('image/jpeg');

            query = $http.post('/account', {
                pass : $scope.password1,
                email : $scope.email,
                img_hd: data_hd,
                img_thumbnail: data_thumbnail
            });

        });
    };
}