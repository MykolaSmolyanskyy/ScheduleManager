/*
 * baseObserver.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

(function () {
    'use strict';

    /**
     * @ngdoc factory
     * @module SchedulingManager
     * @name BaseObserver
     * @description Base class for all observers
     *
     */
    app.factory('BaseObserver', [
            function () {
                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name baseObserver
                 * @constructor BaseObserver
                 * @param {array} _subscribers The list of subscribers.
                 * @description Creates new instance of BaseObserver.
                 *
                 */
                function BaseObserver(_subscribers) {
                    var self = this;

                    /**
                     * @ngdoc method
                     * @module SchedulingManager
                     * @name BaseObserver#notifySubscribers
                     * @param {object} data The data to notify.
                     * @description Notifies subscribers.
                     *
                     */
                    self.notifySubscribers = function (data) {
                        _.each(_subscribers, function (callback) {
                            callback(data);
                        });
                    };

                    /**
                     * @ngdoc method
                     * @module SchedulingManager
                     * @name BaseObserver#subscribe
                     * @param {Function} callback The callback.
                     * @description Subscribes callback.
                     *
                     */
                    self.subscribe = function (callback) {
                        _subscribers.push(callback);
                    };

                    /**
                     * @ngdoc method
                     * @module SchedulingManager
                     * @name BaseObserver#unsubscribe
                     * @param {Function} callback The callback.
                     * @description Unsubscribes callback.
                     *
                     */
                    self.unsubscribe = function (callback) {
                        var index = _subscribers.indexOf(callback);

                        if (index > -1) {
                            _subscribers.splice(index, 1);
                        }
                    };
                }

                return BaseObserver;
            }
        ]);
})();