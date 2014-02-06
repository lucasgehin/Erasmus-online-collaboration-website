
/*
 GET /chat page.
 */

(function() {
  exports.chat = function(req, res) {
    if (!req.session || !req.session.connected) {
      return res.redirect("/");
    } else {
      return res.render('chat');
    }
  };

}).call(this);
