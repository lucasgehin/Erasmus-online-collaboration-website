(function() {
  var avoid_sql_injection, build, connect, db, mysql, nb_essay, options, query;

  mysql = require('mysql');

  options = {
    host: '127.0.0.1',
    database: 'ipviope',
    user: 'ipviope',
    password: 'ipviope'
  };

  db = null;

  nb_essay = 0;

  connect = function() {
    db = mysql.createConnection(options);
    return db.connect(function(err) {
      if (err) {
        console.warn("CONNECT_DATABASE: Erreur de connexion a la BD!");
        console.warn(err);
        nb_essay++;
        if (nb_essay < 10) {
          return setTimeout(connect, 2000);
        }
      } else {
        return console.log("CONNECT_DATABASE : Connecté à la Base de Données!");
      }
    });
  };

  query = function(sqlQuery, params, callback) {
    query = build(sqlQuery, params);
    console.log(query);
    return db.query(query, function(err, rows, fields) {
      return callback(err, rows, fields);
    });
  };

  build = function(query, params) {
    var p, param, q, _i, _len;
    q = query;
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      param = params[_i];
      p = avoid_sql_injection(param);
      q = q.replace("?", p);
    }
    return q;
  };

  avoid_sql_injection = function(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
      }
    });
  };

  connect();

  exports.query = query;

}).call(this);
