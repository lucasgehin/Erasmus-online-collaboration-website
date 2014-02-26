/*jslint browser: false*/
/*global dirname */

/*

  Toi qui est curieux , passe ton chemin.
                _.._
              /     o\__,
              \    -.___/
               \   \
         (\____)    \
     |\_(           ))
_____|    (_        /________
     _\_____(______/__
          ______

  Si ce code tu touche, tout casser tu vas!


  Ce code sert à concatener les fichiers .js du dossier ./ (models) à l'interieur d'une instance de Sequelize.

  De cette manière les modèles sont dans le même espace de nom et peuvent se réferencer mutuellements

  Ils sont donc accessibles via Sequelize.<Nom du modele>


  Pour ajouter un modèle ajoutez simplement un fichier au dossier models (.) en prenant comme template un des fichiers déja existant
 */


var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    lodash    = require('lodash'),
    sequelize = require('../controllers/Database').db, //new Sequelize('sequelize_test', 'root', null),
    db        = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        "use strict";
        var a_charger = (file.indexOf('.') !== 0) && (file !== 'index.js');
        return a_charger;
    })
    .forEach(function (file) {
        "use strict";

        var model = sequelize["import"](path.join(__dirname, file));
        
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    "use strict";
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);