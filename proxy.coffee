###

	Ce proxy est la racine du site

	Il permet de faire tourner tourner toutes les applis sur un même port ( 80 )

###

proxy_port = 3000


options = {

	'hostnameOnly' : true,
	router : {
		
		'docs.ipviope.tk':"127.0.0.1:9001"
		"ipviope.tk":"127.0.0.1:3001"
	}
}


proxy = require('http-proxy').createServer options

proxy.listen proxy_port

