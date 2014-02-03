(function() {
  var country, create, data, db, err, _i, _len;

  db = require('../models');

  data = [
    {
      name: 'Portugal'
    }, {
      name: 'Italy'
    }, {
      name: 'Spain'
    }, {
      name: 'Finland'
    }, {
      name: 'United Kingdom'
    }, {
      name: 'Netherland'
    }, {
      name: 'Poland'
    }, {
      name: 'France'
    }
  ];

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    country = data[_i];
    try {
      create = db.Country.create(country);
      create.success(function(country) {
        return console.log("created: " + country.name);
      });
      create.error(function(err) {
        console.log("Erreur pour " + country.name + ":");
        return console.log(err);
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pour " + country.name + " : ");
      console.log(err);
    }
  }

}).call(this);
