
/*
 GET logout page.
 */

(function() {
  exports.logout = function(req, res) {
    var options, r;
    if (req.session && req.session.connected) {
      r = confirm("Do you really want to log out ?");
      if (r) {
        return res.redirect("/home");
      }
    } else {
      options = {
        title: "IpVIOPE"
      };
      return res.render('index', options);
    }
  };

}).call(this);
