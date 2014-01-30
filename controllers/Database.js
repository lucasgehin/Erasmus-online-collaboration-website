(function() {
  var Database, Exception, MYSQL, config;

  MYSQL = require('mysql');

  Exception = require('./Exception');

  config = require('../Database_config').config;


  /*
  
  Permet d'acceder à la base de données
   */

  Database = (function() {
    var connect, options, pool, reconnexion, surveiller_deconnexion;

    options = null;

    pool = null;

    function Database() {}

    Database.get_connection = function(user_callback) {
      if (pool != null) {
        return pool.getConnection(function(err, connection) {
          if (err != null) {
            console.log(err);
          }
          return user_callback(err, connection);
        });
      } else {
        return connect(function(err, connection) {
          if (err != null) {
            console.log(err);
          }
          return user_callback(err, connection);
        });
      }
    };


    /*
      @end_connection = ->
      connection.end() if connection
     * Privée permet de creer un objet connexion
     */

    connect = function(callback) {
      if (config != null) {
        options = config;
      }
      pool = MYSQL.createPool(options);
      return pool.getConnection(function(err, connection) {
        return callback(err, connection);
      });

      /*
          db.connect (err)->
            if err
              console.warn """
      
              Erreur de connection a la base de donnees :
               *{err}
      
      
              """
              reconnexion()
            else
              connection = db
              user_callback connection
              surveiller_deconnexion db
       */
    };

    surveiller_deconnexion = function(db) {
      return db.on('error', function(err) {
        console.warn('Erreur de la base de donnees!!!', err);
        return reconnexion();
      });
    };

    reconnexion = function() {
      console.warn('Reconnexion...');
      return connect(function(db) {
        return console.warn('Reconnecte !!!');
      });
    };

    return Database;

  })();

  exports.Database = Database;

}).call(this);
