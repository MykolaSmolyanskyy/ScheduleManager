module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['**/*.js', 'test/**/*.js','!Gruntfile.js', '!karma.conf.js', '!node_modules/**/*.*'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // setup watch expressions for dev mode
        watch: {
            reload: {
                files: ['**/*.js', '!Gruntfile.js', '!karma.conf.js', '!node_modules/**/*.*'],
                tasks: ['jshint', 'karma:unit']
            }
        },

        // run unit test
        karma: {
            // do single testrun
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                background: false
            },
            // starts a karma test server in background. with an subsequent 'karma:unitwatch:run' task
            // execution will run the tests  on that server
            unitwatch: {
                configFile: 'karma.conf.js',
                background: false,
                singleRun: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['karma:unit']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('karma-watch', ['karma:unit', 'watch']);
};