(function() {
  var async, data, db, err, find_user, news, _i, _len;

  async = require('async');

  db = require('../models');

  data = [
    {
      title: 'News 1',
      content: 'News écrite par un étudiant',
      user: 'test_student'
    }, {
      title: 'News 2',
      content: 'News écrite par un Administrateur',
      user: 'test_admin'
    }, {
      title: 'News 3',
      content: 'News écrite par un professeur.',
      user: 'test_teacher'
    }, {
      title: 'News 4',
      content: 'News écrite par un professeur.',
      user: 'test_teacher'
    }
  ];


  /*
  
      Code d'injection
   */

  find_user = function(news, callback) {
    var query;
    query = db.User.find({
      where: {
        username: news.user
      }
    });
    query.success(function(user) {
      news.user = user;
      return callback(null, news);
    });
    return query.error(function(err) {
      console.log("Erreur pour " + news.title);
      console.log(err);
      return callback(null);
    });
  };

  for (_i = 0, _len = data.length; _i < _len; _i++) {
    news = data[_i];
    try {
      async.parallel({
        news_with_user: function(callback) {
          return find_user(news, callback);
        }
      }, function(err, results) {
        var create, user;
        if (err) {
          console.log("Une erreur est survenue dans async");
          return console.log(err);
        } else {
          user = results.news_with_user.user;
          news = results.news_with_user;
          news.user = null;
          create = db.News.create(news);
          create.success(function(new_news) {
            new_news.setUser(user);
            return console.log("created: " + new_news.title);
          });
          return create.error(function(err) {
            console.log("Erreur pour " + new_news.title + ":");
            return console.log(err);
          });
        }
      });
    } catch (_error) {
      err = _error;
      console.log("Erreur pour " + news.title + " :");
      console.log(err);
    }
  }

}).call(this);
