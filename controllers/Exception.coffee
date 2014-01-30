###
  
 Défini une exception générique

###

class Exception
  
  message = ""
  code = null

  constructor: (string, code_d_erreur) ->
    message = string if string?
    code = code_d_erreur if code_d_erreur?



exports.Exception = Exception