
/*

	Toi qui est curieux , passe ton chemin.
	                _.._
                 /   o\__,
                 \  -.___/
                  \  \
             (\____)  \
         |\_(         ))
    _____|   (_        /________
         _\____(______/__
           ______

	Si ce code tu touche, tout casser tu vas!


	Ce code sert à concatener les fichiers .js du dossier ./ (models) à l'interieur d'une instance de Sequelize.

	De cette manière les modèles sont dans le même espace de nom et peuvent se réferencer mutuellements

	Ils sont donc accessibles via Sequelize.<Nom du modele>


	Pour ajouter un modèle ajoutez simplement un fichier au dossier models (.) en prenant comme template un des fichiers déja existant
 */

(function() {
  var Sequelize, db, files, fs, path, sequelize, _;

  fs = require('fs');

  path = require('path');

  Sequelize = require('sequelize');

  _ = require('underscore');

  sequelize = require('../controllers/Database').db;

  db = {};

  files = fs.readdirSync(__dirname).filter(function(file) {
    var compile_si;
    compile_si = (file.indexOf('.js') > 0) && (file !== 'index.js');
    return compile_si;
  });

  files.forEach(function(file) {
    var model;
    model = sequelize["import"](path.join(__dirname, file));
    return db[model.name] = model;
  });

  Object.keys(db).forEach(function(modelName) {
    var _base;
    if (typeof (_base = db[modelName]).associate === "function") {
      _base.associate(db);
    }
    return null;
  });

  module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db);

}).call(this);
