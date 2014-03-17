
module.exports = function (grunt) {
    "use strict";

    var config, files = [
        '*.js',
        './controllers/**/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './views/**/*.js',
        './tests/**/*.js',
        './public/javascripts/index/**.js',
        './public/javascripts/home/**.js',
        './public/javascripts/chat/**.js',
        './public/javascripts/fullcalendar/*.js'
    ];


    config = {
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        mochaTest: {
            test: {
                src: ["tests/**/*.js"]
            }
        },
        jshint: {
            src: files,
            options: {

                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        concat: {
            dist: {
                src: [
                    //'public/javascripts/fullcalendar/lib/moment.min.js',
                    //'public/javascripts/fullcalendar/fullcalendar/fullcalendar.js',
                    //'public/javascripts/bootstrap/js/bootstrap.js',
                    //'public/socket.io/socket.io.js',
                    //'public/javascripts/pickadate/legacy.js',
                    //'public/javascripts/pickadate/picker.js',
                    //'public/javascripts/pickadate/picker.date.js',
                    //'public/javascripts/pickadate/picker.time.js',
                    //'public/javascripts/ckeditor-standard/ckeditor.js',
                    //'public/javascripts/ckeditor-standard/dialog-patch.js',
                    //'public/javascripts/moment.min.js',
                    //'public/javascripts/colorpicker/js/colorpicker.js',
                    'public/javascripts/fullcalendar/main.js',
                    'public/javascripts/fullcalendar/controllers.js'
                ],
                dest: 'public/javascripts/fullcalendar/calendar.js.concat',
            }
        },
        uglify: {
            options: {
                mangle: false,
                //beautify: true
            },
            Calendar_JS: {
                files: {
                    'public/javascripts/fullcalendar/calendar.js.min': [
                        'public/javascripts/fullcalendar/fullcalendar/fullcalendar.js',
                        'public/javascripts/bootstrap/js/bootstrap.js',
                        'public/javascripts/pickadate/picker.js',
                        'public/javascripts/pickadate/picker.date.js',
                        'public/javascripts/pickadate/picker.time.js',
                        'public/javascripts/moment.min.js',
                        'public/javascripts/colorpicker/js/colorpicker.js',
                        'public/javascripts/fullcalendar/main.js',
                        'public/javascripts/fullcalendar/controllers.js'
                    ]
                }
            }
        }
    };


    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('test', ['mochaTest']);

};