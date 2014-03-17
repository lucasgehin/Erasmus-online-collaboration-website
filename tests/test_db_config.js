

var assert, config;

assert = require('assert');

config = require('../Database_config').config;

describe("Config de la base de données", function () {

    "use strict";

    describe("le type de BDD", function () {
        it("doit être 'mysql'. Si vous avez effectivement changé de SGBD, veuillez adapter test_db_config.coffee.", function () {
            assert.equal(config.dialect, "mysql");
        });
    });
    describe("l'hote", function () {
        it("doit être une chaîne de taille non nulle", function () {
            assert(config.host.length > 0);
        });
    });
    describe("le port d'écoute", function () {
        it("devrait être un entier comprit entre 0 et 65000", function () {
            assert((0 <= config.port && config.port <= 65000));
        });
    });
    describe("le nom de la base de données", function () {
        it("doit être une chaîne de taille non nulle", function () {
            assert(config.database.length > 0);
        });
    });
    describe("l'utilisateur", function () {
        it("doit être une chaîne de taille non nulle", function () {
            assert(config.user.length > 0);
        });
    });
    describe("le mot de passe", function () {
        it("doit être une chaîne de taille non nulle. Si votre base est sans mot de passe alors il y a rique de faille de sécuritée. Créez en un. (GRANT)", function () {
            assert(config.password.length > 0);
        });
    });
});
