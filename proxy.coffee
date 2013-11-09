###

	Ce proxy est la racine du site

	Il permet de faire tourner tourner toutes les applis sur un même port ( 80 )

###

proxy_port = 80


options = {

	
	router : {

		"ipviope.tk":"localhost:3001"		# root
		"docs.ipviope.tk":"localhost:9001"	# EtherPad
		"crous.ipviope.tk":"localhost:81" # Apache 
	}
}


proxy = require('http-proxy').createServer options

proxy.listen proxy_port

