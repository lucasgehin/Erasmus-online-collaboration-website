
###
 GET home page.
###

exports.home = (req, res) ->

	if not req.session or not req.session.connected
		res.redirect "/"
	else
		options = 
			title: "Welcome - IpVIOPE"

		res.render 'home', options
