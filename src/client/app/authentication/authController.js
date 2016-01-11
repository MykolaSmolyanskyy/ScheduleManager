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

app.controller('AuthController', ['$scope', '$location', 'authFactory', '$log', 'LogoutObserver',
    function ($scope, $location, authFactory, $log, LogoutObserver) {
        $scope.currentUser = {
            username: '',
            password: ''
        };

        var observer = new LogoutObserver();

        $scope.logIn = function(){
            authFactory.login($scope.currentUser).then(function(data){
                if (!data){
                    $location.path('/login');
                    return;
                }

                $location.path('/calendar');
            }, function(err){
                $log.error(err);
            });
        };

        $scope.logOut = function(){
            authFactory.logout().then(function(){
                $location.path('/login');
            }, function(err){
                $log.error(err);
            });
        };

        observer.subscribe($scope.logOut);

        $scope.$on('$destroy', function () {
                observer.unsubscribe($scope.logOut);
            }
        );
    }
]);