/*
 * authFactory.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

/**
 * @ngdoc factory
 * @module SchedulingManager
 * @name authFactory
 * @description
 * Contains service for authentication
 */

(function () {
    'use strict';

    angular.module('SchedulingManager').factory('authFactory', ['$q', '$http', '$cookies', 'URL_CONSTANTS',
        function ($q, $http, $cookies, URL_CONSTANTS) {
            var _login,
                _logout,
                _getUserName,
                _isAuthenticated,
                _getUserId,
                _clearCookies;

            _login = function (credentials) {
                var deferred = $q.defer();

                $http.post(URL_CONSTANTS.BASE_URL + 'login?username=' + credentials.username + '&password=' + credentials.password, {}).success(function (data, status) {
                    if (status === 401) {
                        deferred.resolve('Error. Please check your credentials.')
                    }

                    deferred.resolve(data);
                }).error(function (error) {
                    console.error(error);
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            _logout = function () {
                var deferred = $q.defer();

                $http.get(URL_CONSTANTS.BASE_URL + 'logout').success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    console.error(error);
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            _getUserName = function () {
                var username = $cookies.get('username');
                return username ? username : null;
            };

            _getUserId = function () {
                var userId = $cookies.get('id');
                return userId ? userId : null;
            };

            _isAuthenticated = function () {
                var userId = $cookies.get('id');

                return userId ? true : false;
            };

            _clearCookies = function () {
                $cookies.remove('username');
                $cookies.remove('id');
            };

            return {
                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#login
                 * @param {object} username and password
                 * @return {object} promise, that resolves with object containing username, id and expiration date
                 *
                 * @description
                 * Login user
                 */
                login: _login,

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#logout
                 * @return {object} promise, that resolves with object containing username, id and expiration date
                 *
                 * @description
                 * Logout user
                 */
                logout: _logout,

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#getUserName
                 * @return {string} username of current user
                 *
                 * @description
                 * Gets username of current user
                 */
                getUserName: _getUserName,

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#isAuthenticated
                 * @return {boolean} boolean value that uses to know whether user is logged in
                 *
                 * @description
                 * Gets true/false whether user logged in
                 */
                isAuthenticated: _isAuthenticated,

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#getUserId
                 * @return {number} user id
                 *
                 * @description
                 * Gets user id
                 */
                getUserId: _getUserId,

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name authFactory#clearCookies
                 *
                 * @description
                 * Clears current user from cookies
                 */
                clearCookies: _clearCookies
            };
        }
    ]);
})();