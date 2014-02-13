
sys = require("sys")

stdin = process.openStdin()





console.log """

######################################################
            /!\\    ATTENTION     /!\\
######################################################

Vous avez demander la purge de la base de données.

Toutes les tables vont êtres suppimées ( DROP TABLE ).
Elles seront ensuites recréées.

Il vous appartiens de sauvegarder les données et de garantire leur integrité.


Si vous souhaitez confirmer entrez 'reset':

>>>"""


stdin.addListener "data", (d)->
  # note:  d is an object, and when converted to a string it will
  # end with a linefeed.  so we (rather crudely) account for that  
  # with toString() and then substring()

  reponse = d.toString().substring(0, d.length-1)


  if yes #reponse is "reset"
    console.log "Purge en cours..."
    reset()
  else
    console.log """

    Purge Annulée.

    A plus !"""
    next()



reset  = ->

  db = require '../models'

  sync = db.sequelize.sync {force: true}
  
  sync.success ->
    console.log """
  
La base de donnée a été remise a zero.
      
Veillez à ré-injecter les données de test grâce aux fichiers inject_data_<table>.js présent dans ce dossier.
  
    """

    next()
  
  sync.error (err)->
  
    console.log """
  
    Une Erreur est survenue lors de la remise à zero de la bdd
  
    """

    next()


next= ->

  console.log """


  """

  process.exit()