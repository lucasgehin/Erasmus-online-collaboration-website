// Generated by CoffeeScript 1.7.1

/*
 GET logout page.
 */


exports.logout = function (req, res) {
    "use strict";
    var options;
    if (req.session && req.session.connected) {

        res.redirect("/home");

    } else {
        options = {
            title: "IpVIOPE"
        };
        res.render('index', options);
    }
};


