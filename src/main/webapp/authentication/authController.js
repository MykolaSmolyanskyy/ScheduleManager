/*
 * authController.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

/**
 * @ngdoc controller
 * @module SchedulingManager
 * @name AuthController
 * @description
 * Contains logic for user login
 */
(function () {
    'use strict';

    angular.module('SchedulingManager').controller('AuthController', ['$scope', '$location', 'authFactory', '$log',
        function ($scope, $location, authFactory, $log) {
            $scope.currentUser = {
                username: '',
                password: ''
            };

            $scope.logIn = function () {

                if ($scope.loginForm.$invalid) {
                    $scope.loginForm.password.$setDirty();
                    $scope.loginForm.username.$setDirty();
                    return;
                }

                authFactory.login($scope.currentUser).then(function (data) {
                    if (!data.username) {
                        $scope.loginError = data;
                        return;
                    }

                    $location.path('/calendar');
                }, function (err) {
                    $log.error(err);
                });
            };
        }
    ]);
})();