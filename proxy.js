
/*
    Ce proxy est la racine du site

    Il permet de faire tourner tourner toutes les applis sur un même port ( 80 )
 */


var options, proxy, proxy_port, server;

proxy_port = 80;

options = {
    router: {
        "ipviope.tk": "localhost:3001",
        "docs.ipviope.tk": "localhost:9001",
        "aci-charlemagne.tk": "localhost:81"
    }
};

proxy = require('http-proxy');

server = proxy.createServer(options);

server.listen(proxy_port);


