
/*
 GET /easteregg page.
 */

(function() {
  exports.easteregg = function(req, res) {
    if (!req.session || !req.session.connected) {
      return res.redirect("/");
    } else {
      return res.render('easter-egg');
    }
  };

}).call(this);
