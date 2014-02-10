(function() {
  var create, data, db, err, status, _i, _len;

  db = require('../models');

  data = [
    {
      name: 'Student',
      description: "A Student post can be viewed by everybody",
      rank: 1
    }, {
      name: 'Teacher',
      description: "A Teacher post can be viewed by Admins, Teachers, and optionaly by Students",
      rank: 2
    }, {
      name: 'Admin',
      description: "An Admin post can be viewed by Admins and optionaly by Teachers and/or Students",
      rank: 3
    }
  ];

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    status = data[_i];
    try {
      create = db.Status.create(status);
      create.success(function(status) {
        return console.log("created: " + status.name);
      });
      create.error(function(err) {
        console.log("Erreur pour " + status.name + ":");
        return console.log(err);
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pour " + status.name + " : ");
      console.log(err);
    }
  }

}).call(this);
