$(document).ready ->
  load_start()
  start()

$calendar = null

start = ->


  # On ajuste la taille du calendrier

  $calendar = $ '#calendar'

  

  # On initilalise le calendrier
  
  

  options=
    
    defaultView:'agendaWeek'
    header:
      left:'title'
      center:''
      right:'today prev,next month,agendaWeek,agendaDay'

    eventAfterAllRender: ->
      load_end()

  $calendar.fullCalendar options
  

  resize_calendar()

  $(window).on 'resize', ->
    resize_calendar()


# Chargement
load_count = 0
$load_img = $ '#ajaxloader'

@load_start=->
  if load_count is 0
    $load_img.fadeIn 'fast'   

  load_count++

@load_end=->
  if load_count > 0
    load_count--

  if load_count is 0
    $load_img.fadeOut 'slow'




resize_calendar = ->

  height_calendar = $(window).height() - $('.navbar').height() * 1.6

  $("#calendar").fullCalendar 'option', 'height', height_calendar