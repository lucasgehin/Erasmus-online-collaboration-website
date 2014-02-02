$(document).ready ->
  load_start()
  start()

$calendar = null

start = ->
  
  $calendar = $ '#calendar'

  options=
    defaultView:'agendaWeek'
    header:
      left:'title'
      center:''
      right:'today prev,next month,agendaWeek,agendaDay'

    eventAfterAllRender: ->
      load_end()

  $calendar.fullCalendar options







# Charement
load_count = 0
$load_img = $ '#ajaxloader'

load_start=->
  if load_count is 0
    $load_img.fadeIn 'fast'   

  load_count++

load_end=->
  if load_count > 0
    load_count--

  if load_count is 0
    $load_img.fadeOut 'slow'