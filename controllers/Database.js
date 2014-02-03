
/*
  Parametrage de L'ORM
 */

(function() {
  var ORM, Sequelize, config, e;

  Sequelize = require('sequelize');

  config = require('../Database_config').config;

  if (config != null) {
    try {
      ORM = new Sequelize(config.database, config.user, config.password, {
        dialect: config.dialect,
        host: config.host,
        port: config.port
      });
      ORM.authenticate().complete(function(err) {
        if (err != null) {
          return console.log('Unable to connect to the database:', err);
        } else {
          return console.log('Connection to Database has been established successfully.');
        }
      });
    } catch (_error) {
      e = _error;
      console.log("Erreur de connexion à la BDD : " + e);
    }
  }

  exports.db = ORM;

}).call(this);
