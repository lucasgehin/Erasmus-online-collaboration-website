
/*
 GET /chat page.
 */

(function() {
  exports.chat = function(req, res) {
    var user, _ref;
    user = (_ref = req.session) != null ? _ref.user : void 0;
    if (!req.session || !req.session.connected) {
      return res.redirect("/");
    } else {
      return res.render('chat', {
        user: user
      });
    }
  };

}).call(this);
