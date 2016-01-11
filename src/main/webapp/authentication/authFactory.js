/*
 * authFactory.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

/**
 * @ngdoc factory
 * @module SchedulingManager
 * @name authFactory
 * @description
 * Contains service for authentication
 */

app.factory('authFactory', ['$q', '$http', '$cookies',
    function ($q, $http, $cookies) {
        var _login,
            _logout,
            _getUserName,
            _isAuthenticated,
            _getUserId;

        _login = function (credentials) {
            var deferred = $q.defer();
            //TODO: replace url with constant
            $http.post('http://localhost:6587/api/login', credentials).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                console.error(error);
                deferred.reject(error);
            });

            return deferred.promise;
        };

        _logout = function () {
            var deferred = $q.defer();
            $http.get('http://localhost:6587/api/logout').success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                console.error(error);
                deferred.reject(error);
            });

            return deferred.promise;
        };

        _getUserName = function () {
            var user = $cookies.getObject('currentUser');
            return user && user.username ? user.username : null;
        };

        _getUserId = function () {
            var user = $cookies.getObject('currentUser');
            return user && user.id ? user.id : null;
        };

        _isAuthenticated = function(){
            var user = $cookies.getObject('currentUser'),
                expDate;
            if (user && user.expDate){
                expDate = new Date(user.expDate);
                return expDate.getTime() >= new Date().getTime();
            }

            return false;
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
            getUserId: _getUserId
        };
    }
]);