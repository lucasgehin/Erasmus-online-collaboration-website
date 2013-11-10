
###
 GET login page.
###

exports.login = (req, res) ->

	if req.session and req.session.connected
		res.redirect "/home"
	else
		options = 
			title: "IpVIOPE"

		res.render 'index', options
