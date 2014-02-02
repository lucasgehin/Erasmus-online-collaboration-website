

###
 GET /calendar page.
###

exports.calendar = (req, res) ->
  if not req.session or not req.session.connected
    res.redirect "/"
  else    
    res.render 'calendar'
