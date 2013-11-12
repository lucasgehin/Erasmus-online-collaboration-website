api = require('etherpad-lite-client')

etherpad = api.connect({
  apikey: 'dF3eQAQ9UCV6GkoXZRnkECli5ZsKm7rm',
  host: 'localhost',
  port: 9001,
});



author = etherpad.createAuthor("geo", function(err,data){
	if (err) console.log(err);
	if(data) console.log(data);
});

console.log(author);