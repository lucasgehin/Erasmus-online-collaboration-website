(function() {
  var Exception, Projects, db;

  db = require('../models');

  Exception = require('./Exception').Exception;


  /*
  
    Controlleur gérant les Projects
   */

  Projects = (function() {
    function Projects() {}

    Projects.find_all = function(callback) {
      var query;
      query = db.Project.findAll({
        include: [
          {
            model: db.Country
          }, {
            model: db.Image
          }
        ]
      });
      query.success(function(Projects) {
        return callback(null, Projects);
      });
      return query.error(function(err) {
        console.log("Projects@find_all: " + err);
        return callback(err, null);
      });
    };

    Projects.find_by_id = function(id, callback) {
      var err, query;
      if (typeof id === "number") {
        id = parseInt(id);
        query = db.Project.find(id);
        query.success(function(user) {
          return callback(null, user);
        });
        return query.error(function(err) {
          console.log("Project@find_all: " + err);
          return callback(err, null);
        });
      } else {
        err = new Exception("Users@find_by_id: Id should be an integer in range  [0..n], |" + id + "| given. ", 1);
        return callback(err, null);
      }
    };

    Projects.find_by_title = function(title_param, callback) {
      var query;
      if (typeof title_param === "string") {
        query = db.Project.find({
          where: {
            title: title_param
          }
        });
        query.success(function(user) {
          return callback(null, user);
        });
        return query.error(function(err) {
          console.log("Project@find_by_title: " + err);
          return callback(err, null);
        });
      }
    };

    return Projects;

  })();

  exports.Projects = Projects;

}).call(this);
