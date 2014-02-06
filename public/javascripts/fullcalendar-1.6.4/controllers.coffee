$calendar = null


$(document).ready ->
  $calendar = $ '#calendar'
  start()


#Collections






#Sockets
socket = null

start= ->

  socket = io.connect "/calendar"
  
  socket.on 'connect', ()->
    console.log "IO: Connected!"
    load_end()

    init_calendar()
  
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

  socket.on 'update_event', (event)->
    Events.replace event


init_calendar = ->

  # On ajuste la taille du calendrier

  $calendar = $ '#calendar'

  # On initilalise le calendrier
  
  height_calendar = $(window).height() - $('.navbar').height() * 1.6
  

  options=
    
    height: height_calendar
    defaultView:'agendaWeek'
    ignoreTimezone: false
    header:
      left:'title'
      center:''
      right:'today prev,next month,agendaWeek,agendaDay'

    
    dragRevertDuration: 2000
    eventRevertDuration: 3000
    

    eventAfterAllRender: ->
      load_end()

    eventDrop: (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view )->
      if not event.editable
        revertFunc()
      else 
        if true #confirm "Are you sure to move this event here ?"
          Events.update event
        else
          revertFunc()


    eventResize: (event, revertFunc)->
      #alert(event.title + " end is now " + event.end.format())
 
      #if not confirm("is this okay?")
      #  revertFunc()


  $calendar.fullCalendar options
  
  

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
  
  @update: (event)->

    load_start()

    #event  = Events.correct_event_start event

    socket.emit 'update_event', event, (err, response)->
      if err?
        alert("An error has occured... maybe your internet connection ?")
      else
        if response.response isnt yes
          alert("This event has not been saved. Maybe you dont have rights on it ?")
      
      load_end()

  @replace: (event)->
    $calendar.fullCalendar 'removeEvents' , event.id
    $calendar.fullCalendar 'renderEvent' , event
