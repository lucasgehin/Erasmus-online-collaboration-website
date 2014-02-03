(function() {
  var async, data, db, err, find_country, find_status, user, _i, _len;

  async = require('async');

  db = require('../models');

  data = [
    {
      username: 'test_student',
      password: 'test_pass',
      firstname: 'Etudiant',
      name: 'de test',
      mail: 'test_mail@student.com',
      country: 'France',
      status: 'Student'
    }, {
      username: 'test_teacher',
      password: 'test_pass',
      firstname: 'Prof',
      name: 'de test',
      mail: 'test_mail@teacher.com',
      country: 'Finland',
      status: 'Teacher'
    }, {
      username: 'test_admin',
      password: 'test_pass',
      firstname: 'Admin',
      name: 'de test',
      mail: 'test_mail@admin.com',
      country: 'United Kingdom',
      status: 'Admin'
    }
  ];


  /*
  
      Code d'injection
   */

  find_country = function(user, callback) {
    var query;
    query = db.Country.find({
      where: {
        name: user.country
      }
    });
    query.success(function(country) {
      user.country = country;
      return callback(null, user);
    });
    return query.error(function(err) {
      console.log("Erreur pour " + name_country);
      console.log(err);
      return callback(null);
    });
  };

  find_status = function(user, callback) {
    var query;
    query = db.Status.find({
      where: {
        name: user.status
      }
    });
    query.success(function(status) {
      user.status = status;
      return callback(null, user);
    });
    return query.error(function(err) {
      console.log("Erreur pour " + status_country);
      console.log(err);
      return callback(null);
    });
  };

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    user = data[_i];
    try {
      async.parallel({
        user_with_country: function(callback) {
          return find_country(user, callback);
        },
        user_with_status: function(callback) {
          return find_status(user, callback);
        }
      }, function(err, results) {
        var country, create, status;
        if (err) {
          console.log("Une erreur est survenue dans async");
          return console.log(err);
        } else {
          country = results.user_with_country.country;
          status = results.user_with_status.status;
          user = results.user_with_country;
          user.country = null;
          create = db.User.create(user);
          create.success(function(new_user) {
            new_user.setStatu(status);
            new_user.setCountry(country);
            return console.log("created: " + new_user.username);
          });
          return create.error(function(err) {
            console.log("Erreur pour " + user.username + ":");
            return console.log(err);
          });
        }
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pour " + user.username + " :");
      console.log(err);
    }
  }

}).call(this);
