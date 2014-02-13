(function() {
  var next, reset, stdin, sys;

  sys = require("sys");

  stdin = process.openStdin();

  console.log("\n######################################################\n            /!\\    ATTENTION     /!\\\n######################################################\n\nVous avez demander la purge de la base de données.\n\nToutes les tables vont êtres suppimées ( DROP TABLE ).\nElles seront ensuites recréées.\n\nIl vous appartiens de sauvegarder les données et de garantire leur integrité.\n\n\nSi vous souhaitez confirmer entrez 'reset':\n\n>>>");

  stdin.addListener("data", function(d) {
    var reponse;
    reponse = d.toString().substring(0, d.length - 1);
    if (true) {
      console.log("Purge en cours...");
      return reset();
    } else {
      console.log("\nPurge Annulée.\n\nA plus !");
      return next();
    }
  });

  reset = function() {
    var db, sync;
    db = require('../models');
    sync = db.sequelize.sync({
      force: true
    });
    sync.success(function() {
      console.log("\nLa base de donnée a été remise a zero.\n    \nVeillez à ré-injecter les données de test grâce aux fichiers inject_data_<table>.js présent dans ce dossier.\n");
      return next();
    });
    return sync.error(function(err) {
      console.log("\n  Une Erreur est survenue lors de la remise à zero de la bdd\n");
      return next();
    });
  };

  next = function() {
    console.log("\n");
    return process.exit();
  };

}).call(this);
