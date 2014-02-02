
db = require '../models'
{Exception} = require './Exception'


###

  Controlleur gérant les Projects

###



class Projects
  constructor: ->
  
  #Callback de la forme: (err, list)
  @find_all: (callback) ->

    query  =  db.Project.findAll {
      include: [
        {model: db.Country},
        {model: db.Image }
      ]
    }

    query.success (Projects)->
      callback null, Projects

    query.error (err)->
      console.log "Projects@find_all: #{err}"
      callback err, null


  #Callback de la forme: (err, item)
  @find_by_id: (id, callback)->

    if typeof id is "number"

      id= parseInt id # On enlève les décimaux 
  
      query  =  db.Project.find(id)
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Project@find_all: #{err}"
        callback err, null
    else

      err = new Exception "Users@find_by_id: Id should be an integer in range  [0..n], |#{id}| given. ", 1
      
      callback err, null

  #Callback de la forme: (err, item). username est un champ UNIQUE
  @find_by_title: (title_param, callback)->

    if typeof title_param is "string"
      query  =  db.Project.find {where: {title: title_param}}
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Project@find_by_title: #{err}"
        callback err, null





exports.Projects = Projects