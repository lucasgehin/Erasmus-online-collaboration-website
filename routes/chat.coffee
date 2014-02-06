

###
 GET /chat page.
###

exports.chat = (req, res) ->

  user = req.session?.user
  if not req.session or not req.session.connected
    res.redirect "/"
  else    
    res.render 'chat', {user:user}
