async = require 'async'

db = require '../models'

data=[
  {
    name: 'Rogue Like'
    description: 'An old style Rogue like game in a shell.'
    country: 'France'
  },
  {
    name: 'Twitter Client'
    description: 'A Classic twitter client witten in Java.'
    country: 'United Kingdom'
  },
  {
    name: '4 In A Row'
    description: ' A Classic 4 in a row game written in C.'
    country: 'Spain'
  },
  {
    name: 'Space Invaders'
    description: 'A Space Invaders whith an arcade style.'
    country: 'Finland'
  }
  
]


###

    Code d'injection

###


find_country= (project, callback)->

  query = db.Country.find { where:{ name: project.country } } 

  query.success (country)->

    project.country = country

    callback null, project

  query.error (err)->

    console.log "Erreur pour #{name_country}"
    console.log err
    callback null



for project in data
  try

    async.parallel {
      project_with_country: (callback)->
        find_country project, callback
    }, (err, results)->

      
      if err
        console.log "Une erreur est survenue dans async"
        console.log err

      else

        
        country = results.project_with_country.country
        

        project = results.project_with_country
        project.country = null

        create = db.Project.create project
        
        create.success (new_project)->        

          
          new_project.setCountry country

          console.log "created: #{new_project.name}"


        create.error (err)->
          console.log "Erreur pour #{new_project.name}:"
          console.log err



  catch err
    console.log "Erreur pour #{new_project.name} :"
    console.log err
  