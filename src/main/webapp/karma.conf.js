module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files to exclude
        exclude: ['Gruntfile.js', 'karma.conf.js'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/moment/moment.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/fullcalendar/dist/fullcalendar.js',
            'node_modules/angular-ui-calendar/src/calendar.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-cookies/angular-cookies.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
            'node_modules/lodash/dist/lodash.min.js',
            'app.js',
            'shell/**/*.js',
            'shell/**/*.html',
            'authentication/**/*.js',
            'authentication/**/*.html',
            'scheduler/**/*.js',
            'scheduler/**/*.html',
            'test/**/*.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app.js': ['coverage'],
            'shell/**/*.js': ['coverage'],
            'shell/**/*.html': ['ng-html2js'],
            'authentication/**/*.js': ['coverage'],
            'authentication/**/*.html': ['ng-html2js'],
            'scheduler/**/*.js': ['coverage'],
            'scheduler/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // setting this option will create a single module that contains templates
            // from all the files, so you can load them all with module('templates')
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'coverage'],

        // don't shut down phantom instance for 1 minute
        // because should be able to reuse the instance
        // in one testrun. E.g. run unit tests against
        // sources and minified artifacts
        browserNoActivityTimeout: 60000,

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        }
    });
};