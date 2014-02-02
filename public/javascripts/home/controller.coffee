
#Collections

News_list = []
Events_list = []
Documents_list = []
Projects_list = []
Users_list = []


#Sockets

@socket = io.connect "/home"

socket.on 'connect', ()->
  console.log "IO: Connected!"
  load_end()


socket.on "message", (data)->
  console.log data
  

socket.on 'connecting', ()->
  console.log "IO: Connecting to /home..."
  load_start()




# jQUery

  #vide

# tools
sanitize = (event, jqueryObject)->
  event.preventDefault()
  event.stopPropagation()
  if jqueryObject.is ":animated"
    jqueryObject.stop()
    jqueryObject.clearQueue()

# Charement
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
  

# Angular 



# Controllers
@User_Manager = ($scope)->

  $scope.list = ->
    return Users_list


  $scope.get_users = ->
    load_start()
    socket.emit 'get_users_list', null, (error, response)->
      #console.log response
      Users_list = response if response?
      #console.log "User list saved"
      load_end()

      $scope.$apply() # Sert à forcer la MAJ de la vue

  socket.on 'connect', ->
    $scope.get_users()



@News_Management = ($scope)->

  

  $scope.list = ->
    return News_list

  $scope.more= ->
    return (News_list.length == 0 || News_list[0].id == -1)


  $scope.get_news_list = ()->
    console.log "Getting news list"
    load_start()
    socket.emit 'get_news_list',null, (err, response)->
      
      load_end()

      console.log response

      if response?
        News_list = response
   

      if News_list.length is 0
        News_list.push JSON.stringify {
          id:-1
          title: "There is nothing here yet :("
          content : "Add a message"
          createdAt: new Date()
        }

      $scope.$apply()

  socket.on 'connect', ->
    $scope.get_news_list()

  $scope.show =  (item)->
    popup = document.querySelector "#popup-news"
    scope = angular.element(popup).scope()
    scope.title = item.title
    scope.content = item.content
      
    $(popup).modal()

    return null

  $scope.show_all = ->
    popup = document.querySelector "#popup-news-all"    
    scope = angular.element(popup).scope()
    if not scope.is_initialized
      scope.initalize()    
    scope.show()

    return null

  


@Setting_Management= ($scope)->


  $scope.show= ()->
    popup= document.querySelector "#popup_settings"
    scope= angular.element(popup).scope()    
        
    $(popup).modal()

  

@Setting_Selection = ($scope)->




@popup_news = ($scope)->
  $scope.title = ""
  $scope.content = ""
  $scope.date= ""

  return null


@popup_news_all = ($scope)->

  $scope.list= ->
    return News_list

  $scope.is_initialized = false  
  $scope.current_content = ''


  $scope.initalize = ->
    
    News_list[0].active = true
    $scope.activated = News_list[0]
    $scope.is_initialized = true

    return null


  $scope.show_new = (item)->
    $scope.current_content = item.content
    $scope.activated.active = false

    $scope.activated = item
    $scope.activated.active = true

    return null

  


  $scope.show= ()->
    self = document.querySelector "#popup-news-all"
    $("html, body").animate {
      "scrollTop": 0
    }, 500
    $scope.current_content = $scope.activated.content
    $(self).modal()

  return null
  
@popup_settings = ($scope)->
  $scope.title = ""
  $scope.content = ""


@Project_Manager= ($scope)->

  $scope.list = ->
    return Projects_list

  $scope.get_projects =->
    load_start()

    socket.emit 'get_projects_list', null, (error, response)->
      
      console.log response
      
      Projects_list = response if response?
      
      load_end()

      $scope.$apply()



  socket.on 'connect' , ->
    $scope.get_projects()