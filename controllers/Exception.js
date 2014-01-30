
/*
  
 Défini une exception générique
 */

(function() {
  var Exception;

  Exception = (function() {
    var code, message;

    message = "";

    code = null;

    function Exception(string, code_d_erreur) {
      if (string != null) {
        message = string;
      }
      if (code_d_erreur != null) {
        code = code_d_erreur;
      }
    }

    return Exception;

  })();

  exports.Exception = Exception;

}).call(this);
