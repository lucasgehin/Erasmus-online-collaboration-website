(function() {
  var async, data, db, err, find_country, project, _i, _len;

  async = require('async');

  db = require('../models');

  data = [
    {
      name: 'Rogue Like',
      description: 'An old style Rogue like game in a shell.',
      country: 'France'
    }, {
      name: 'Twitter Client',
      description: 'A Classic twitter client witten in Java.',
      country: 'United Kingdom'
    }, {
      name: '4 In A Row',
      description: ' A Classic 4 in a row game written in C.',
      country: 'Spain'
    }, {
      name: 'Space Invaders',
      description: 'A Space Invaders whith an arcade style.',
      country: 'Finland'
    }
  ];


  /*
  
      Code d'injection
   */

  find_country = function(project, callback) {
    var query;
    query = db.Country.find({
      where: {
        name: project.country
      }
    });
    query.success(function(country) {
      project.country = country;
      return callback(null, project);
    });
    return query.error(function(err) {
      console.log("Erreur pour " + name_country);
      console.log(err);
      return callback(null);
    });
  };

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    project = data[_i];
    try {
      async.parallel({
        project_with_country: function(callback) {
          return find_country(project, callback);
        }
      }, function(err, results) {
        var country, create;
        if (err) {
          console.log("Une erreur est survenue dans async");
          return console.log(err);
        } else {
          country = results.project_with_country.country;
          project = results.project_with_country;
          project.country = null;
          create = db.Project.create(project);
          create.success(function(new_project) {
            new_project.setCountry(country);
            return console.log("created: " + new_project.name);
          });
          return create.error(function(err) {
            console.log("Erreur pour " + new_project.name + ":");
            return console.log(err);
          });
        }
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pour " + new_project.name + " :");
      console.log(err);
    }
  }

}).call(this);