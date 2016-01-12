/*
 * navigationDirective.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @module SchedulingManager
     * @name navigationDirective
     * @restrict E
     *
     * @description Shows vertical navigation menu.
     *
     * ## Example
     *
     * *HTML*
     * ```html
     *  <navigation-directive/>
     * ```
     *
     */
    angular.module('SchedulingManager').directive('navigationDirective', ['ScheduleObserver', 'authFactory', '$log', '$location',
        function (ScheduleObserver, authFactory, $log, $location) {
            return {
                scope: {},
                restrict: 'E',
                replace: true,
                templateUrl: 'shell/navigation/navigation.html',
                link: function ($scope) {
                    if(!authFactory.isAuthenticated()){
                        $location.path('/login');
                        return;
                    }
                    var scheduleObserver = new ScheduleObserver();

                    $scope.username = authFactory.getUserName();

                    $scope.scheduleClick = function () {
                        scheduleObserver.notifyScheduleSubscribers();
                    };

                    $scope.logoutClick = function () {
                        authFactory.logout().then(function(){
                            authFactory.clearCookies();
                            $location.path('/login');
                        }, function(err){
                            $log.error(err);
                        });
                    };

                    $scope.toggleMenu = function () {
                        $scope.isMenuHidden = !$scope.isMenuHidden;
                    };
                }
            };
        }]);
})();
