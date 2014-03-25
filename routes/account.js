
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

        var pass, mail, img_hd, img_thumb, response;

        pass = req.body.pass;
        mail = req.body.mail;
        img_hd = req.body.img_hd;
        img_thumb = req.body.img_thumbnail;

        db.User.find(req.session.user.id).success(function (user) {
            user.pass = pass;
            user.mail = mail;
            // user.

            console.log(user);
            user.save().success(function (user) {
                console.log("success");
                response = JSON.stringify({
                    ok: true
                });
                res.end(response);
            }).error(function (err) {
                console.log("error");
                response = JSON.stringify({
                    ok: false,
                    err: err
                });
                res.end(response);
            });
        });

    }
};


