/*
 * authController.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

/**
 * @ngdoc controller
 * @module SchedulingManager
 * @name AuthController
 * @description
 * Contains logic for user login
 */

app.controller('AuthController', ['$scope', '$location', 'authFactory', '$log',
    function ($scope, $location, authFactory, $log) {
        $scope.currentUser = {
            username: '',
            password: ''
        };

        $scope.logIn = function(){
            authFactory.login($scope.currentUser).then(function(data){
                if (!data && !data.username){
                    $location.path('/login');
                    return;
                }

                $location.path('/calendar');
            }, function(err){
                $log.error(err);
            });
        };
    }
]);