start = ()->





#Shake au passage de la souris

  $(".logos img[id!='logo-rotate']").on "mouseover",()->
    if not $(this).is ":animated" 
      $(this).effect "shake",{
        distance: 1,
        times: 3
      }   
  

  $(".logo-function").on "mouseenter", ()->
    $(this).animate {
      "border-top-left-radius": "-=25",
      "border-top-right-radius": "-=25",
      "border-bottom-left-radius": "-=25",
      "border-bottom-right-radius": "-=25",
    }
  
  $(".logo-function").on "mouseleave", ()->
    $(this).animate {
      "border-top-left-radius": "+=25",
      "border-top-right-radius": "+=25",
      "border-bottom-left-radius": "+=25",
      "border-bottom-right-radius": "+=25",
    }
  


# Shake automatique
  

  liste_logos = [
    {id:"#logo-ipl"},
    {id:"#logo-inh"},
    {id:"#logo-metropolia"},
    {id:"#logo-udl"},
    {id:"#logo-gcu"},
    {id:"#logo-cuot"},
    {id:"#logo-unimi"},
  ]

  
  shake_logo = ( id, time )->
    setTimeout () ->

      $(id).effect "shake",{
        distance: 1,
        times: 3
      }      

    , time*100

  

  start_shake_logos = ()->
    for i in [0..liste_logos.length-1]
      logo = liste_logos[i]
      shake_logo logo.id, i+1
    

  # On shake dès l'arrivée sur la page
  start_shake_logos()

  # Et on re-shake toutes les 10 secondes

  setInterval ()->
    start_shake_logos()         
  , 10000



  # Navigation auvec scroll doux

  slide_time = 600

  $("#titre").on "click", (e)-> 
    e.preventDefault()
    e.stopPropagation()
    top = 0
    $("html, body").animate {
      scrollTop: top
    },slide_time
  

  $("#about-link").on "click",(e)-> 
    #alert("about")
    
    top = $("#about").offset().top - 50
    $("html,body").animate {
      scrollTop: top
    }, slide_time
    
  
  $("#contact-link").on "click",(e)-> 
    
    top = $(".contact").eq(0).offset().top
    $("html,body").animate {
      scrollTop: top
    }, slide_time
  


# Quand tout est prêt on lance les animations et listeners

$(window).on "load", start