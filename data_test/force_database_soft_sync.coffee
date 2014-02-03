

db = require '../models'

sync = db.sequelize.sync()

sync.success ->
  
  console.log """

  
La base de donnée a été rafraichie.
      
  
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