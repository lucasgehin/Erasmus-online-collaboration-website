async = require 'async'

db = require '../models'

data=[
  {
    username: 'test_student'
    password: 'test_pass'
    firstname : 'Etudiant'
    name: 'de test'
    mail: 'test_mail@student.com'
    country:'France'
    status:'Student'
    

  },
  {
    username: 'test_teacher'
    password: 'test_pass'
    firstname : 'Prof'
    name: 'de test'
    mail: 'test_mail@teacher.com'
    country:'Finland'
    status:'Teacher'

  },
  {
    username: 'test_admin'
    password: 'test_pass'
    firstname : 'Admin'
    name: 'de test'
    mail: 'test_mail@admin.com'
    country:'United Kingdom'
    status:'Admin'

  }
]


###

    Code d'injection

###


find_country= (user, callback)->

  query = db.Country.find { where:{ name: user.country } } 

  query.success (country)->

    user.country = country

    callback null, user

  query.error (err)->

    console.log "Erreur pour #{name_country}"
    console.log err
    callback null

find_status= (user, callback)->

  query = db.Status.find { where:{ name: user.status} } 

  query.success (status)->

    user.status = status
    callback null, user

  query.error (err)->

    console.log "Erreur pour #{status_country}"
    console.log err
    callback null



for user in data
  try

    async.parallel {
      user_with_country: (callback)->
        find_country user, callback
      user_with_status: (callback)->
        find_status user, callback
    }, (err, results)->

      
      if err
        console.log "Une erreur est survenue dans async"
        console.log err

      else

        
        country = results.user_with_country.country
        status = results.user_with_status.status

        user = results.user_with_country
        user.country = null

        create = db.User.create user
        
        create.success (new_user)->

        

          new_user.setStatu status
          new_user.setCountry country

          console.log "created: #{new_user.username}"


        create.error (err)->
          console.log "Erreur pour #{user.username}:"
          console.log err



  catch err
    console.log "Erreur pour #{user.username} :"
    console.log err
  