$calendar = null


$(document).ready ->
  $calendar = $ '#calendar'
  start()

  $cp = $ '#color-picker'

  $cp.ColorPicker({
    onSubmit: (hsb, hex, rgb, el)->
      apply_color hsb, hex, rgb, el
    onChange: (hsb, hex, rgb)->
      apply_color hsb, hex, rgb, $cp

    onShow: (colpkr)->
      $(colpkr).fadeIn 500
      return false
    
    onHide: (colpkr)->
      $(colpkr).fadeOut 500
      return false
          
    onBeforeShow:->
      apply_color null, '6BA5C2', null, $cp
    
  })
  .bind 'keyup', ->
    $(this).ColorPickerSetColor(this.value)
  
  apply_color= (hsb, hex, rgb, el)->
    $(el).val hex + " | Your text will look like this."
    $(el).css 'background-color', "##{hex}"
    
    

# Parameters







###
              Sockets
###

calendar_started = no
events_fetched = no

socket = null

start= ->

  socket = io.connect "/calendar"
  
  socket.on 'connect', ()->
    console.log "IO: Connected!"
    load_end()

    init_calendar() if not calendar_started

    #load_all_events()

  
  socket.on "message", (data)->
    console.log data    
  
  socket.on 'connecting', ()->
    console.log "IO: Connecting to /calendar..."
    load_start()

  socket.on 'update_event', (event)->
    load_start()
    event.editable = yes if is_editing and event.is_editable
    Events.replace event
    load_end()


###
          FULL CALENDAR
###

load_all_events = ->

  load_start()
  Events.find_all (err, events)->
    load_end() if err?

    for event in events
      $calendar.fullCalendar 'renderEvent', event

    events_fetched = yes   

    load_end()



init_calendar = ->

  calendar_started = yes
  # On ajuste la taille du calendrier

  $calendar = $ '#calendar'

  # On initilalise le calendrier
  
  height_calendar = $(window).height() - $('.navbar').height() * 1.6
  

  options=
    
    height: height_calendar
    firstDay: 1
    defaultView:'agendaWeek'

    ignoreTimezone: false
    header:
      left:''
      center:''
      right:'today prev,next month,agendaWeek,agendaDay'
    buttonText:
      prev:     '←'
      next:     '→'
      prevYear: '«' 
      nextYear: '»'  
      today:    'today'
      month:    'month'
      week:     'week'
      day:      'day'

    
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


    eventResize: (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view)->
      if not event.editable
        revertFunc()
      else
        if true #confirm "Are you sure to move this event here ?"
          Events.update event
        else
          revertFunc()

    eventClick: (event, jsEvent, view)->              
      $scope_popup = $('#popup-show-event').scope()
      $scope_popup.show event
      

    viewRender: (view, element)->
      
      $calendar.fullCalendar 'removeEvents'
      load_all_events()

       

  $calendar.fullCalendar options

  button_edit_calendar = """
    <button id='edit-calendar' class='btn btn-success' >
      <span class="glyphicon glyphicon-edit">&emsp;Edit</span>
    </button>
  """

  $('.fc-header-left').html button_edit_calendar


  $('#edit-calendar').on 'click', ->    
    toggle_edit()

  
###

          CLASS EVENTS

###
  

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
  
  @update: (event, callback)->

    load_start()

    #event  = Events.correct_event_start event

    socket.emit 'update_event', event, (err, response)->
      if err?
        alert("An error has occured... maybe your internet connection ?")
      else
        if response.response isnt yes
          alert("This event has not been saved. Maybe you dont have rights on it ?")
      
      load_end()

      callback(event) if callback? and response.response is yes

  @replace: (event)->
    $calendar.fullCalendar 'removeEvents' , event.id
    $calendar.fullCalendar 'renderEvent' , event




###
              ANGULAR CONTROLLERS
###

@popup_show_event = ($scope, $sce)-> 
  
  $scope.disabled = true
  $scope.priority = 1
  event_backup = null  

  $popup_show = $ "#popup-show-event"

  $scope.show = (event)->

    $scope.title = event.title
    $scope.description = $sce.trustAsHtml event.description
    $scope.start = moment(event.start).format('MMMM Do YYYY, h:mm:ss a') if event.start?
    $scope.end =   moment(event.end).format('MMMM Do YYYY, h:mm:ss a') if event.end?
    $scope.priority = event.priority

    $scope.disabled = not event.editable

    event_backup = event

    $scope.$apply()

    $popup_show.modal 'show'

    toggle_edit()
    
    
    
      

  $scope.edit =->
    scope = $('#popup-edit-event').scope()
    $scope.close()
    scope.edit event_backup
    return null

  $scope.close = ->
    toggle_edit()
    $popup_show.modal 'hide'
    return null

  
    


@popup_edit_event= ($scope)->


  $scope.title = ""

  $scope.priority = 1

  $popup_edit = $ "#popup-edit-event"

  event_backup = null


  $scope.color_map=[
    { # notice → gray
      name: "Insignificant - Gray"
      color: '#676767'
      id: 0
    }
    { # Classic → blue
      name: "Normal - Blue"
      color: '#6BA5C2'
      id: 1
    }
    {
      # Important → orange
      name: "Important - Orange"
      color: '#FFA12F'
      id: 2
    }
    {
      # Obligatory → red
      name: "Mandatory - Red"
      color: '#FF2B2B'
      id: 3
    }
  ]
  
    
  $scope.color = 1


  $scope.edit = (event)->

    event_backup = event
    $scope.title = event.title    
    $scope.priority = event.priority


    $popup_edit.modal 'show'

    toggle_edit()

    picker_date_start = $popup_edit.find("#date-start").pickadate().pickadate("picker") #.set 'select', unix_time_start
    picker_time_start = $popup_edit.find("#time-start").pickatime().pickatime('picker') #.set 'select', unix_time_start
    

    picker_date_end = $popup_edit.find("#date-end").pickadate().pickadate('picker')
    picker_time_end = $popup_edit.find("#time-end").pickatime().pickatime('picker')
  

    #if event.start? and event.end?

    unix_time_start = new Date  event.start
    unix_time_end = new Date  event.end if event.end?
  
    picker_date_start.set "max", unix_time_end if unix_time_end?
    picker_date_start.set "select", unix_time_start
  
    picker_time_start.set "max", unix_time_end if unix_time_end?
    picker_time_start.set "select", unix_time_start 
  
  
    picker_date_end.set 'min', unix_time_start
    picker_date_end.set 'select', unix_time_end
  
    picker_time_end.set 'min', unix_time_start
    picker_time_end.set 'select', unix_time_end
  
  
    CKEDITOR.instances.editor.setData  event.description

  $scope.save = ->

    alert $scope.color

    event = event_backup

    event.title = $scope.title
    event.description = CKEDITOR.instances.editor.getData()


    select_date_start = $('#date-start').pickadate().pickadate('picker').get('select')
    select_time_start = $('#time-start').pickatime().pickatime('picker').get('select')

    select_date_end = $('#date-end').pickadate().pickadate('picker').get('select')
    select_time_end = $('#time-end').pickatime().pickatime('picker').get('select')
          
    date_start = new Date( select_date_start.pick )     
    date_start.setHours( select_time_start.hour  ) 
    date_start.setMinutes( select_time_start.mins )


    date_end = new Date (select_date_end.pick)
    date_end.setHours( select_time_end.hour )
    date_end.setMinutes( select_time_end.mins )


    event.start = date_start.toJSON()
    event.end = date_end.toJSON()

    console.log date_start.toJSON()
    console.log date_end.toJSON()


    event.priority = $scope.priority

    Events.update event, (event)->

      scope = $('#popup-show-event').scope()
      scope.show event
      $scope.close()

    return null
    
  $scope.close =->
    $popup_edit.modal 'hide'
    toggle_edit()
    return null


#   COLORPICKER







# ANIMATION EDITION


  

is_editing = no


@toggle_edit = (skip) ->

  
  
  is_editing = not is_editing

  $btn = $('#edit-calendar span')
    
  if is_editing

    $btn.html '&nbsp;&nbsp;Stop Editing'
    $btn.toggleClass 'glyphicon-edit'
    $btn.toggleClass 'glyphicon-check'
    
  else
    $btn.html '&nbsp;&nbsp;Edit'
    $btn.toggleClass 'glyphicon-edit'
    $btn.toggleClass 'glyphicon-check'

  list = $calendar.fullCalendar 'clientEvents'

  for event in list
    if is_editing
      event.editable = yes if event.is_editable is yes
    else
      event.editable = no if event.is_editable is yes
    
    Events.replace event