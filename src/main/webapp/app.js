/*
 * eventsFactory.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

/**
 * @ngdoc module
 * @module SchedulingManager
 * @name SchedulingManager
 * @description Main Module that holds core components and common features
 *
 */

var app = angular.module('SchedulingManager', ['ngRoute', 'ui.calendar', 'ui.bootstrap', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/calendar', {
                templateUrl: 'scheduler/scheduler.html',
                controller: 'SchedulerController'
            })
            .when('/login', {
                templateUrl: 'authentication/login.html',
                controller: 'AuthController'
            })
            .otherwise({
                redirectTo: '/calendar'
            });
    }])
    .constant('_', window._);

app.run(['$route', '$rootScope', '$location', 'authFactory',
    function ($route, $rootScope, $location, authFactory) {
        if (!authFactory.isAuthenticated()) {
            $location.path('/login');
        }
    }
]);