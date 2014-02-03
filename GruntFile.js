(function() {
  module.exports = function(grunt) {
    var config;
    config = {
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      coffee: {
        "default": {
          expand: true,
          cwd: '.',
          src: ['*!(Gruntfile).coffee', './models/**/*.coffee', './controllers/**/*.coffee', './routes/**/*.coffee', './public/**/*.coffee', './views/**/*.coffee', './tests/**/*.coffee', './data_test/**/*.coffee'],
          ext: '.js'
        }
      },
      coffeelint: {
        app: ['*.coffee', './controllers/**/*.coffee', './models/**/*.coffee', './routes/**/*.coffee', './public/**/*.coffee', './views/**/*.coffee', './tests/**/*.coffee', "./data_test/**/*.coffee"],
        options: {
          max_line_length: {
            level: 'ignore'
          },
          no_trailing_whitespace: {
            level: 'ignore'
          }
        }
      },
      mochaTest: {
        test: {
          src: ["tests/**/*.js"]
        }
      },
      jshint: {
        src: ['*.js', './controllers/**/*.js', './models/**/*.js', './routes/**/*.js', './views/**/*.js', './public/**/*.js', './tests/**/*.js'],
        options: {
          '-W069': true,
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('default', ['coffeelint', 'coffee', 'mochaTest']);
    return grunt.registerTask('compile', ['Compilation']);
  };

}).call(this);
