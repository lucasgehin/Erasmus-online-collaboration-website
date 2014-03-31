
/*
 GET /documents page.
 */

exports.documents = function (req, res) {
    "use strict";
    var user;
    user = req.session !== undefined ? req.session.user : undefined;
    if (!req.session || !req.session.connected) {
        res.redirect("/");
    } else {
        res.render('documents', {
            user: user
        });
    }
};
