
db = require '../models'
{Exception} = require './Exception'


###

  Controlleur gérant les Events

###



class Events
  constructor: ->
  
  #Callback de la forme: (err, list)
  @find_all: (callback) ->

    query  =  db.Event.findAll {
      include:[
        {model: db.User , include:[
          db.Status
        ]},
        db.Status,
        db.Project
      ]
    }

    query.success (Events)->
      
      callback null, Events

    query.error (err)->
      console.log "Events@find_all: #{err}"
      callback err, null


  #Callback de la forme: (err, item)
  @find_by_id: (id, callback)->

    if typeof id is "number"

      id= parseInt id # On enlève les décimaux 
  
      query  =  db.Event.find { 
        where:
          id: id
        include:[
          {model: db.User, include:[ db.Status ]}
          db.Status
          db.Project
        ]
      }
  
      query.success (event)->
        callback null, event
  
      query.error (err)->
        console.log "Events@find_all: #{err}"
        callback err, null
    else

      err = new Exception "Events@find_by_id: Id should be an integer in range  [0..n], |#{id}| given. ", 1
      
      callback err, null

  #Callback de la forme: (err, item). username est un champ UNIQUE
  @find_by_title: (title_param, callback)->

    if typeof title_param is "string"
      query  =  db.Event.find {where: {title: title_param}}
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Events@find_by_title: #{err}"
        callback err, null


  @update: (event, callback)->
    id = parseInt event.id

    Events.find_by_id id, (err, db_event)->
      if err?
        console.log err
        callback err, null

      if db_event?
        query = db_event.updateAttributes {
          title: event.title
          description: event.description
          allDay: event.allDay
          start: event.start
          end: event.end
          url : event.url
          color: event.color
          priority: event.priority
          StatuId : event.StatuId
          ProjectId : event.ProjectId
        }

        query.success (db_event)->
          Events.find_by_id db_event.id, (err, event_with_all_data)->
            callback null, event_with_all_data

        query.error (err)->
          if err?
            console.log err           

            callback err, null


exports.Events = Events