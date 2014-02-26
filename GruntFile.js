
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
        './public/javascripts/chat/**.js'
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
        }
    };
    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('default', ['jshint']);
    return grunt.registerTask('test', ['mochaTest']);
};
