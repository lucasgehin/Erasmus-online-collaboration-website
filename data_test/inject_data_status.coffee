db = require '../models'

data=[
  {
    name: 'Student'
    description: "A Student post can be viewed by everybody"
    rank: 1
  },
  {
    name: 'Teacher'
    description: "A Teacher post can be viewed by Admins, Teachers, and optionaly by Students"
    rank: 2
  },
  {
    name: 'Admin'
    description: "An Admin post can be viewed by Admins and optionaly by Teachers and/or Students"
    rank: 3
  }
]


for status in data
  try

    create = db.Status.create status

    create.success (status)->
      console.log "created: #{status.name}"
    create.error (err)->
      console.log "Erreur pour #{status.name}:"
      console.log err

  catch err
    console.log "Erreur pour #{status.name} : "
    console.log err
  