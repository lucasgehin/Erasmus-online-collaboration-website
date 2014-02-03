
/*
 GET /calendar page.
 */

(function() {
  exports.calendar = function(req, res) {
    if (!req.session || !req.session.connected) {
      return res.redirect("/");
    } else {
      return res.render('calendar');
    }
  };

}).call(this);
