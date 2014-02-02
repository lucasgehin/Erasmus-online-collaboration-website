# Navigation douce
slide_time = 600
decallage_y =  -$(".navbar").eq(0).height() - 1

selector = "html, body"

$("#top-link").on "click", (e)-> 
        
  sanitise e, selector 

  target = $(".news-section").offset().top + decallage_y
  
  $("html, body").animate {
    scrollTop: target
  },slide_time

$("#docs-link").on "click", (e)-> 
        
  sanitise e, selector 

  target = $(".pinned-docs-section").offset().top + decallage_y
  
  $("html, body").animate {
    scrollTop: target
  },slide_time


$("#projects-link").on "click",(e)-> 
  
  sanitise e, selector 

  target = $(".projects-link-section").offset().top + decallage_y
  $("html,body").animate {
    scrollTop: target
  }, slide_time
  

$("#users-link").on "click",(e)->

  sanitise e, selector   

  target = $(".users-link-section").offset().top + decallage_y
  $("html,body").animate {
    scrollTop: target
  }, slide_time


sanitise = (event, selector)->
  event.preventDefault()
  event.stopPropagation()
  if $(selector).is ":animated"
    $(selector).stop()
    $(selector).clearQueue()


