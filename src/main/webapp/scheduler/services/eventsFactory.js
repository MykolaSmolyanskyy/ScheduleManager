/*
 * eventsFactory.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

/**
 * @ngdoc factory
 * @module SchedulingManager
 * @name eventsFactory
 * @description
 * Contains service for getting all user's events
 */
(function () {
    'use strict';

    angular.module('SchedulingManager').factory('eventsFactory', ['$q', '$http', '$log', 'URL_CONSTANTS',
        function ($q, $http, $log, URL_CONSTANTS) {
            var _getEventsByUserId;

            _getEventsByUserId = function (userId) {
                var deferred = $q.defer();

                $http.get(URL_CONSTANTS.BASE_URL + 'calendar?userId=' + userId).success(function (events) {
                    deferred.resolve(events);
                }).error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            return {
                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name eventsFactory#getEventsByUserId
                 * @param {string} userId User id
                 * @return Array of user's events
                 *
                 * @description
                 * Loads array of user's events by user id
                 */
                getEventsByUserId: _getEventsByUserId
            };
        }
    ]);
})();