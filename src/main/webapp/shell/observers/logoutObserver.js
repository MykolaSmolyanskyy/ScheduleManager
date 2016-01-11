/*
 * logoutObserver.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

(function () {
    'use strict';

    /**
     * @ngdoc factory
     * @module SchedulingManager
     * @name LogoutObserver
     * @description Notifies subscribers that logout button was pressed.
     *
     */
    app.factory('LogoutObserver', ['BaseObserver',
        function (BaseObserver) {
            var _subscribers =[];

            /**
             * @ngdoc method
             * @module SchedulingManager
             * @name LogoutObserver#LogoutObserver
             * @constructor ScheduleObserver
             * @description Initializes new instance of LogoutObserver.
             *
             */
            function LogoutObserver() {
                var self = this;

                BaseObserver.call(self, _subscribers);

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name LogoutObserver#notifyAllSubscribers
                 * @param {Array} empty array.
                 * @description notifies subscribers.
                 *
                 */
                self.notifyAllSubscribers = function () {
                    self.notifySubscribers([]);
                };
            }

            LogoutObserver.prototype = BaseObserver;
            LogoutObserver.prototype.constructor = LogoutObserver;

            return LogoutObserver;
        }
    ]);
})();