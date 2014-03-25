
var db = require('../models');

/*
 GET /account page.
 */


exports.account = function (req, res) {
    "use strict";
    if (!req.session || !req.session.connected) {
        res.redirect("/");
    } else {
        res.render('account');
    }
};


exports.editAccount = function (req, res) {
    "use strict";
    if (!req.session || !req.session.connected) {
        res.redirect("/");
    } else {

        var pass, mail, img_hd, img_thumb, response, body;

        pass = req.body.pass;
        mail = req.body.email;
        img_hd = req.body.img_hd;
        img_thumb = req.body.img_thumbnail;

        db.User.find(req.session.user.id).success(function (user) {

            db.Image.findOrCreate({
                UserId: user.id
            }).success(function (image) {
                console.log("Image : " + image);
                image.updateAttributes({
                    url_hd: img_hd,
                    url_thumbnail: img_thumb
                }).success(function (image) {
                    image.setUser(user);
                });
            }).error(function (err) {
                console.log(err);
            });

            user.updateAttributes({
                password: pass,
                mail: mail
            }).success(function (user) {
                console.log("success");
                response = JSON.stringify({
                    ok: true
                });
                res.end(response);
            }).error(function (err) {
                console.log("error");
                console.log(err);
                response = JSON.stringify({
                    ok: false,
                    err: err
                });
                res.end(response);
            });
        });

    }
};


