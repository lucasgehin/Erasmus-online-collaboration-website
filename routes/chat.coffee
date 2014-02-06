

###
 GET /chat page.
###

exports.chat = (req, res) ->
  if not req.session or not req.session.connected
    res.redirect "/"
  else    
    res.render 'chat'
