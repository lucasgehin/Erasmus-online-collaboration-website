
/*
 GET login page.
 */

(function() {
  exports.login = function(req, res) {
    var options;
    if (req.session && req.session.connected) {
      return res.redirect("/home");
    } else {
      options = {
        title: "IpVIOPE"
      };
      return res.render('index', options);
    }
  };

}).call(this);
