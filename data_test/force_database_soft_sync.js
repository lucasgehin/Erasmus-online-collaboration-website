(function() {
  var db, next, sync;

  db = require('../models');

  sync = db.sequelize.sync();

  sync.success(function() {
    console.log("\n\nLa base de donnée a été rafraichie.\n    \n");
    return next();
  });

  sync.error(function(err) {
    console.log("\nUne Erreur est survenue lors de la remise à zero de la bdd\n");
    return next();
  });

  next = function() {
    console.log("\n");
    return process.exit();
  };

}).call(this);
