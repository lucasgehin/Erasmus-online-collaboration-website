db = require '../models'
async = require 'async'


date = new Date()

data=[
  {
     title: 'Evenement 1'
     decription: "Description de l'evenement n°1"
     allDay: false
     start: date.setHours( date.getHours() + 1)
     author: 'test_student'
     color: '#6BA5C2'

  },
  {
     title: 'Evenement 2'
     decription: "Description de l'evenement n°2"
     allDay: false
     start: date.setHours( date.getHours() + 2)
     author: 'test_teacher'
     color: '#FFA12F'

  },
  {
     title: 'Evenement 3'
     decription: "Description de l'evenement n°3"
     allDay: false
     start: date.setHours( date.getHours() + 3)
     author: 'test_teacher'
     color: '#6BA5C2'

  },
  {
     title: 'Evenement 4'
     decription: "Description de l'evenement n°4"
     allDay: true
     author: 'test_student'
     color: '#6BA5C2'
  },
  {
     title: 'Evenement 5'
     decription: "Description de l'evenement n°5"
     allDay: false
     start: date.setHours( date.getHours() + 5)
     author: 'test_admin'
     color: '#FF5252'

  },
  {
     title: 'Evenement 6'
     decription: "Description de l'evenement n°6"
     allDay: true
     author: 'test_admin'
     color: '#FF5252'
  },
  {
     title: 'Evenement 7'
     decription: "Description de l'evenement n°7"
     allDay: false
     start: date.setHours( date.getHours() + 7)
     author: 'test_student'
     color: '#8C8C8C'

  },
  {
     title: 'Evenement 8'
     decription: "Description de l'evenement n°8"
     allDay: false
     start: date.setHours( date.getHours() + 8)
     author: 'test_admin'
     color: '#6BA5C2'

  }
]

find_user= (event, callback)->

  query = db.User.find { where:{ username: event.author} } 

  query.success (user)->

    
    event.user = user
    callback null, event

  query.error (err)->

    console.log "Erreur pour #{event.title} à la récuperation en BDD de l'username"
    console.log err
    callback null



for event in data
  try

    async.parallel {      
      event_with_user: (callback)->
        find_user event, callback
    }, (err, results)->

      
      if err
        console.log "Une erreur est survenue dans async"
        console.log err

      else

        user = results.event_with_user.user        

        event = results.event_with_user

        event.username = null

        create = db.Event.create event
        
        create.success (new_event)->

        
          
          
          new_event.setUser user

          console.log "created: #{new_event.title}"


        create.error (err)->
          console.log "Erreur pour #{new_event.title}:"
          console.log err



  catch err
    console.log "Erreur pendant l'injection (catch)"
    console.log err
  