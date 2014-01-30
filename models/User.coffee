###
 Active record sur User
###


{Database} = require '../controllers/Database'
Password = require 'password-hash'



class User

  
  constructor: ->

    # Attributs 
    @id = -1
    @pseudo = ""
    @pass = ""
    @mail = ""
  


  @find_by_id : (id, callback) ->

    sql = """
    SELECT *
    FROM users
    WHERE `id` = ?;
    """

    Database.get_connection (erreur, connection) ->

      console.log erreur if erreur?

      query = connection.query sql, [id] , ( erreur, lignes, colonnes)->

        
        console.log erreur if erreur?

        user = null

        if lignes?.length is 1
            # On a une seule correspondance de pseudo. donc c'est ok

          user = new User()

          ligne = lignes[0]

          user.id = ligne.id
          user.pseudo = ligne.pseudo
          user.pass = ligne.pass
          user.mail = ligne.mail


          connection.release()

        callback erreur, user





  @find_by_pseudo : (pseudo, callback) ->

    sql = """
    SELECT *
    FROM users
    WHERE `pseudo` = ?;
    """    

    Database.get_connection (erreur, connection) ->

      console.log erreur if erreur?
      
      query = connection.query sql, [pseudo] , ( erreur, lignes, colonnes)->

        
        console.log erreur if erreur?

        user = null

        if lignes? and lignes.length is 1
            # On a une seule correspondance de pseudo. donc c'est ok

          user = new User()

          ligne = lignes[0]

          user.id = ligne.id
          user.pseudo = ligne.pseudo
          user.pass = ligne.pass
          user.mail = ligne.mail


        callback erreur, user

        connection.release()


  @find_by_mail : (mail, callback) ->

    sql = """
    SELECT *
    FROM users
    WHERE `mail` = ?;
    """    

    Database.get_connection (erreur, connection) ->

      console.log erreur if erreur?
      
      query = connection.query sql, [mail] , ( erreur, lignes, colonnes)->
        
        console.log erreur if erreur?

        user = null

        if lignes? and lignes.length is 1
            # On a une seule correspondance de mail. donc c'est ok
          user = new User()

          ligne = lignes[0]

          user.id = ligne.id
          user.pseudo = ligne.pseudo
          user.pass = ligne.pass
          user.mail = ligne.mail



        callback erreur, user

        connection.release()



  # Retourne un tableau d'objet User
  @find_all : (user_callback)->

    sql = "SELECT * FROM users;"

    Database.get_connection (erreur, connection)->

      console.log erreur if erreur?
         
      retour = []  # Le tableau qui sera retourné

      query = connection.query sql , (erreur, lignes, colonnes)->
        if lignes
          for ligne in lignes
            user = new User()

            user.id  =  ligne.id
            user.pseudo =  ligne.pseudo
            user.pass =  ligne.pass
            user.mail =  ligne.mail

            retour.push user

          connection.release()

        user_callback retour, erreur  # On renvoi le tout. Si il y a une erreur on l'envoi à l'utilisateur

  # CRUD
  


  # Insert/Update dans la base de données
  save : ( user_callback )=>

    utilisateur_existant = null

    # On vérifie si l'user existe.

    if @pseudo?
      
      @constructor.find_by_pseudo @pseudo, (erreur, utilisateur) =>
        console.log erreur if erreur?

        if utilisateur?
          utilisateur_existant = utilisateur 

        if utilisateur_existant?  # On fait un UPDATE
          
    
          @hash_password()
    
          # Il est convenu qu'on ne peux pas changer de pseudo ( ce n'est pas un chat )
          sql = """
            UPDATE users
            SET `pass` = ?,`mail` = ?
            WHERE `id` = ?;
          """
    
          Database.get_connection (erreur, connection)=>
            console.log erreur if erreur?
            if connection?
    
              query = connection.query sql, [@pass, @mail, @id], (erreur, resultat) ->
                console.log erreur if erreur?
                
                user_callback erreur, false, resultat
    
        else if @pseudo and @pass # On fait un INSERT
    
          console.log "insert"
          @hash_password()
      
          sql = """
          INSERT INTO users
          (`pseudo`, `pass`, `mail`)
          VALUES (?, ?, ?) ;
          """
      
    
          Database.get_connection (err, connection) =>
          # Attention à la FAT ARROW (=>) ici : elle permet d'acceder au @attributs depuis un callback
    
    
            query = connection.query sql, [@pseudo, @pass, @mail], (erreur, resultat) =>
              if not erreur and resultat
                console.log resultat.insertId
                @id = resultat.insertId
              
              user_callback erreur, true, resultat
              connection.release()

  # Supprime de la base de données
  remove : (callback) ->
    if @id >= 0

      sql = """
      DELETE FROM users
      WHERE `id` = ? ;
      """

      Database.get_connection ( err, connection ) => # FAT ARROW
        query  = connection.query sql, [@id] , (erreur, resultat)->
          callback erreur, resultat
          connection.release()
    
  

  # OUTILS

  hash_password : ->

    if not  Password.isHashed @pass
      @pass = Password.generate @pass




exports.User = User