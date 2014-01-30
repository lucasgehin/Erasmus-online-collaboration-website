module.exports = (grunt)->

  config =
    pkg: grunt.file.readJSON 'package.json'  # on lit les infos du projet
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'


    coffee:  # Le compilateur CoffeScript
      default:
        expand: true
        cwd: '.'      # le dossier ou on commence la compilation
        src: ['*!(Gruntfile).coffee', './models/**/*.coffee','./controllers/**/*.coffee', './routes/**/*.coffee', './public/**/*.coffee', './views/**/*.coffee', './tests/**/*.coffee']  # les fichiers qui nous interressents
        ext: '.js'   # l'extention des fichiers compilés
    
    coffeelint:
      app: ['*.coffee', './controllers/**/*.coffee' ,'./models/**/*.coffee','./routes/**/*.coffee', './public/**/*.coffee', './views/**/*.coffee', './tests/**/*.coffee' ]
      options:
        max_line_length:         # Longueur de ligne maximale pour eviter le code incompréhensif.
          level: 'ignore'  		   # C'est n'est qu'un avertissement
        no_trailing_whitespace:  # Empecher les vides en fin de ligne
          level: 'ignore'        # on ignore

          
    # Permet de verifier la propretée du code compilé JS
    jshint:
      
      # define the files to lint
      src: ['*.js', './controllers/**/*.js', './models/**/*.js', './routes/**/*.js',  './views/**/*.js', './public/**/*.js', './tests/**/*.js' ]
        # configure JSHint (documented at http://www.jshint.com/docs/)
      options:
        '-W069': true # Dot notation
        # more options here if you want to override JSHint defaults
        globals:
          jQuery: true
          console: true
          module: true
          



  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-coffeelint'


  grunt.registerTask 'default', ['coffeelint', 'coffee']
  grunt.registerTask 'compile', ['coffee']