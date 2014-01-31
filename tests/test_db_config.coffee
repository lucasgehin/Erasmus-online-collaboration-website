
assert = require 'assert'
{config} = require '../Database_config'



describe "Config de la base de données", ->

  describe "le type de BDD", ->
    it "doit être 'mysql'. Si vous avez effectivement changé de SGBD, veuillez adapter test_db_config.coffee.", ->
      
      assert.equal config.dialect , "mysql"

  describe "l'hote", ->
    it "doit être une chaîne de taille non nulle", ->
      
      assert config.host.length > 0

  describe "le port d'écoute", ->
    it "devrait être un entier comprit entre 0 et 65000", ->

      assert 0<= config.port <= 65000


  describe "le nom de la base de données", ->
    it "doit être une chaîne de taille non nulle", ->

      assert config.database.length > 0


  describe "l'utilisateur", ->
    it "doit être une chaîne de taille non nulle", ->
      
      assert config.user.length > 0

  describe "le mot de passe", ->
    it "doit être une chaîne de taille non nulle. Si votre base est sans mot de passe alors il y a rique de faille de sécuritée. Créez en un. (GRANT)", ->
      
      assert config.password.length > 0


