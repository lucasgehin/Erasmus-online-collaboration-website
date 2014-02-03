$calendar = null


$(document).ready ->
  $calendar = $ '#calendar'
  start()


#Collections


Events_list = []



#Sockets
socket = null

start= ->

  socket = io.connect "/calendar"
  
  socket.on 'connect', ()->
    console.log "IO: Connected!"
    load_end()
  
    load_start()
    Events.find_all (err, events)->
      load_end() if err?
  
      for event in events
        $calendar.fullCalendar 'renderEvent', event
                
  
      load_end()
  
  socket.on "message", (data)->
    console.log data    
  
  socket.on 'connecting', ()->
    console.log "IO: Connecting to /calendar..."
    load_start()
  






class Events
  constructor: () ->
    # ...

  
  #Callback de la forme: (err, list)
  @find_all: (callback) ->

    socket.emit 'get_events_list', null, (err, response)->
      if err?
        console.log "Events@find_all: #{err}"
      else
        callback err, response
      


  #Callback de la forme: (err, item)
  @find_by_id: (id, callback)->

    if typeof id is "number"

      id= parseInt id # On enlève les décimaux 
  
      query  =  db.Events.find(id)
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Events@find_by_id: #{err}"
        callback err, null
    else

      err = new Exception "Events@find_by_id: Id should be an integer in range  [0..n], |#{id}| given. ", 1
      
      callback err, null

  #Callback de la forme: (err, item). username est un champ UNIQUE
  @find_by_title: (title_param, callback)->

    if typeof title_param is "string"
      query  =  db.Events.find {where: {title: title_param}}
  
      query.success (user)->
        callback null, user
  
      query.error (err)->
        console.log "Events@find_by_title: #{err}"
        callback err, null
  
