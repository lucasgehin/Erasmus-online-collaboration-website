
/*
 Active record sur User
 */

(function() {
  var Database, Password, User,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Database = require('../controllers/Database').Database;

  Password = require('password-hash');

  User = (function() {
    function User() {
      this.save = __bind(this.save, this);
      this.id = -1;
      this.pseudo = "";
      this.pass = "";
      this.mail = "";
    }

    User.find_by_id = function(id, callback) {
      var sql;
      sql = "SELECT *\nFROM users\nWHERE `id` = ?;";
      return Database.get_connection(function(erreur, connection) {
        var query;
        if (erreur != null) {
          console.log(erreur);
        }
        return query = connection.query(sql, [id], function(erreur, lignes, colonnes) {
          var ligne, user;
          if (erreur != null) {
            console.log(erreur);
          }
          user = null;
          if ((lignes != null ? lignes.length : void 0) === 1) {
            user = new User();
            ligne = lignes[0];
            user.id = ligne.id;
            user.pseudo = ligne.pseudo;
            user.pass = ligne.pass;
            user.mail = ligne.mail;
            connection.release();
          }
          return callback(erreur, user);
        });
      });
    };

    User.find_by_pseudo = function(pseudo, callback) {
      var sql;
      sql = "SELECT *\nFROM users\nWHERE `pseudo` = ?;";
      return Database.get_connection(function(erreur, connection) {
        var query;
        if (erreur != null) {
          console.log(erreur);
        }
        return query = connection.query(sql, [pseudo], function(erreur, lignes, colonnes) {
          var ligne, user;
          if (erreur != null) {
            console.log(erreur);
          }
          user = null;
          if ((lignes != null) && lignes.length === 1) {
            user = new User();
            ligne = lignes[0];
            user.id = ligne.id;
            user.pseudo = ligne.pseudo;
            user.pass = ligne.pass;
            user.mail = ligne.mail;
          }
          callback(erreur, user);
          return connection.release();
        });
      });
    };

    User.find_by_mail = function(mail, callback) {
      var sql;
      sql = "SELECT *\nFROM users\nWHERE `mail` = ?;";
      return Database.get_connection(function(erreur, connection) {
        var query;
        if (erreur != null) {
          console.log(erreur);
        }
        return query = connection.query(sql, [mail], function(erreur, lignes, colonnes) {
          var ligne, user;
          if (erreur != null) {
            console.log(erreur);
          }
          user = null;
          if ((lignes != null) && lignes.length === 1) {
            user = new User();
            ligne = lignes[0];
            user.id = ligne.id;
            user.pseudo = ligne.pseudo;
            user.pass = ligne.pass;
            user.mail = ligne.mail;
          }
          callback(erreur, user);
          return connection.release();
        });
      });
    };

    User.find_all = function(user_callback) {
      var sql;
      sql = "SELECT * FROM users;";
      return Database.get_connection(function(erreur, connection) {
        var query, retour;
        if (erreur != null) {
          console.log(erreur);
        }
        retour = [];
        return query = connection.query(sql, function(erreur, lignes, colonnes) {
          var ligne, user, _i, _len;
          if (lignes) {
            for (_i = 0, _len = lignes.length; _i < _len; _i++) {
              ligne = lignes[_i];
              user = new User();
              user.id = ligne.id;
              user.pseudo = ligne.pseudo;
              user.pass = ligne.pass;
              user.mail = ligne.mail;
              retour.push(user);
            }
            connection.release();
          }
          return user_callback(retour, erreur);
        });
      });
    };

    User.prototype.save = function(user_callback) {
      var utilisateur_existant;
      utilisateur_existant = null;
      if (this.pseudo != null) {
        return this.constructor.find_by_pseudo(this.pseudo, (function(_this) {
          return function(erreur, utilisateur) {
            var sql;
            if (erreur != null) {
              console.log(erreur);
            }
            if (utilisateur != null) {
              utilisateur_existant = utilisateur;
            }
            if (utilisateur_existant != null) {
              _this.hash_password();
              sql = "UPDATE users\nSET `pass` = ?,`mail` = ?\nWHERE `id` = ?;";
              return Database.get_connection(function(erreur, connection) {
                var query;
                if (erreur != null) {
                  console.log(erreur);
                }
                if (connection != null) {
                  return query = connection.query(sql, [_this.pass, _this.mail, _this.id], function(erreur, resultat) {
                    if (erreur != null) {
                      console.log(erreur);
                    }
                    return user_callback(erreur, false, resultat);
                  });
                }
              });
            } else if (_this.pseudo && _this.pass) {
              console.log("insert");
              _this.hash_password();
              sql = "INSERT INTO users\n(`pseudo`, `pass`, `mail`)\nVALUES (?, ?, ?) ;";
              return Database.get_connection(function(err, connection) {
                var query;
                return query = connection.query(sql, [_this.pseudo, _this.pass, _this.mail], function(erreur, resultat) {
                  if (!erreur && resultat) {
                    console.log(resultat.insertId);
                    _this.id = resultat.insertId;
                  }
                  user_callback(erreur, true, resultat);
                  return connection.release();
                });
              });
            }
          };
        })(this));
      }
    };

    User.prototype.remove = function(callback) {
      var sql;
      if (this.id >= 0) {
        sql = "DELETE FROM users\nWHERE `id` = ? ;";
        return Database.get_connection((function(_this) {
          return function(err, connection) {
            var query;
            return query = connection.query(sql, [_this.id], function(erreur, resultat) {
              callback(erreur, resultat);
              return connection.release();
            });
          };
        })(this));
      }
    };

    User.prototype.hash_password = function() {
      if (!Password.isHashed(this.pass)) {
        return this.pass = Password.generate(this.pass);
      }
    };

    return User;

  })();

  exports.User = User;

}).call(this);
