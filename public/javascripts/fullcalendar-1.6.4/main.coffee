$(document).ready ->
  load_start()



  



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



