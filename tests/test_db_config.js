(function() {
  var assert, config;

  assert = require('assert');

  config = require('../Database_config').config;

  describe("Config de la base de données", function() {
    describe("le type de BDD", function() {
      return it("doit être 'mysql'. Si vous avez effectivement changé de SGBD, veuillez adapter test_db_config.coffee.", function() {
        return assert.equal(config.dialect, "mysql");
      });
    });
    describe("l'hote", function() {
      return it("doit être une chaîne de taille non nulle", function() {
        return assert(config.host.length > 0);
      });
    });
    describe("le port d'écoute", function() {
      return it("devrait être un entier comprit entre 0 et 65000", function() {
        var _ref;
        return assert((0 <= (_ref = config.port) && _ref <= 65000));
      });
    });
    describe("le nom de la base de données", function() {
      return it("doit être une chaîne de taille non nulle", function() {
        return assert(config.database.length > 0);
      });
    });
    describe("l'utilisateur", function() {
      return it("doit être une chaîne de taille non nulle", function() {
        return assert(config.user.length > 0);
      });
    });
    return describe("le mot de passe", function() {
      return it("doit être une chaîne de taille non nulle. Si votre base est sans mot de passe alors il y a rique de faille de sécuritée. Créez en un. (GRANT)", function() {
        return assert(config.password.length > 0);
      });
    });
  });

}).call(this);
