async = require 'async'

db = require '../models'

data=[
  {
    title: 'News 1'
    content: 'News écrite par un étudiant'
    user: 'test_student'
  },
  {
    title: 'News 2'
    content: 'News écrite par un Administrateur'
    user: 'test_admin'
  },
  {
    title: 'News 3'
    content: 'News écrite par un professeur.'
    user: 'test_teacher'
  },
  {
    title: 'News 4'
    content: 'News écrite par un professeur.'
    user: 'test_teacher'
  }
  
]


###

    Code d'injection

###


find_user= (news, callback)->

  query = db.User.find { where:{ username: news.user } } 

  query.success (user)->

    news.user = user

    callback null, news

  query.error (err)->

    console.log "Erreur pour #{news.title}"
    console.log err
    callback null



for news in data
  try

    async.parallel {
      news_with_user: (callback)->
        find_user news, callback
    }, (err, results)->

      
      if err
        console.log "Une erreur est survenue dans async"
        console.log err

      else

        
        user = results.news_with_user.user
        

        news = results.news_with_user
        news.user = null

        create = db.News.create news
        
        create.success (new_news)->        

          
          new_news.setUser user

          console.log "created: #{new_news.title}"


        create.error (err)->
          console.log "Erreur pour #{new_news.title}:"
          console.log err



  catch err
    console.log "Erreur pour #{news.title} :"
    console.log err
  