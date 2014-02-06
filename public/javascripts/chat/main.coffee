
resize_chat = ->

  height_chat = $(window).height() - $('.navbar').height() * 1.45

  $("#chat").height(height_chat)


resize_chat()


$(window).on "resize",->
  resize_chat()