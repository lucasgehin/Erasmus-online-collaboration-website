# Imports

mysql = require 'mysql'


# Code


options = 
	host     : '127.0.0.1'
	database :  'ipviope'
	user    : 'root'
	password : ''


db = mysql.createConnection options


db.connect();

query =  ( sqlQuery, params, callback )->

	query = build sqlQuery, params

	console.log query

	db.query query, (err, rows, fields) ->
		callback err, rows, fields



# Tools


build = ( query, params) ->
	q = query
	for param in params
		p = avoid_sql_injection param
		q = q.replace "?" , p

	
	return q

avoid_sql_injection = ( str )->

    return str.replace /[\0\x08\x09\x1a\n\r"'\\\%]/g , (char) ->
        switch char 
            when "\0" then return "\\0"
            when "\x08" then return "\\b"
            when "\x09" then return "\\t"
            when "\x1a" then return "\\z"
            when "\n" then return "\\n"           
            when "\r" then return "\\r"            
            when "\"", "'", "\\", "%" then return "\\"+char # prepends a backslash to backslash, percent,
                   											# and double/single quotes
        
    

# Exports

exports.query = query
	
