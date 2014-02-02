
###
 GET /easteregg page.
###

exports.easteregg = (req, res) ->
  if not req.session or not req.session.connected
    res.redirect "/"
  else
    
    res.render 'easter-egg'
