db = require '../models'

data=[
  {
    name: 'Portugal'
  },
  {
    name: 'Italy'
  },
  {
    name: 'Spain'
  },
  {
    name: 'Finland'
  },
  {
    name: 'United Kingdom'
  },
  {
    name: 'Netherland'
  },
  {
    name: 'Poland'
  },
  {
    name: 'France'
  }
]


for country in data
  try

    create = db.Country.create country

    create.success (country)->
      console.log "created: #{country.name}"
    create.error (err)->
      console.log "Erreur pour #{country.name}:"
      console.log err

  catch err
    console.log "Erreur pour #{country.name} : "
    console.log err
  