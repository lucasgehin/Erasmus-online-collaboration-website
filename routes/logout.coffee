
###
 GET logout page.
###

exports.logout = (req, res) ->

  if req.session and req.session.connected
    r = confirm "Do you really want to log out ?"
    if r
      res.redirect "/home"
  else
    options = 
      title: "IpVIOPE"

    res.render 'index', options
