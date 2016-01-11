/*
 * scheduleObserver.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

(function () {
    'use strict';

    /**
     * @ngdoc factory
     * @module SchedulingManager
     * @name ScheduleObserver
     * @description Notifies scheduler to load user's events.
     *
     */
    app.factory('ScheduleObserver', ['BaseObserver',
            function (BaseObserver) {
                var _subscribers =[];

                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name ScheduleObserver#ScheduleObserver
                 * @constructor ScheduleObserver
                 * @description Initializes new instance of ScheduleObserver.
                 *
                 */
                function ScheduleObserver() {
                    var self = this;

                    BaseObserver.call(self, _subscribers);

                    /**
                     * @ngdoc method
                     * @module SchedulingManager
                     * @name SchedulingManager#notifyScheduleSubscribers
                     * @param {Array} empty array.
                     * @description notifies subscribers.
                     *
                     */
                    self.notifyScheduleSubscribers = function () {
                        self.notifySubscribers([]);
                    };
                }

                ScheduleObserver.prototype = BaseObserver;
                ScheduleObserver.prototype.constructor = ScheduleObserver;

                return ScheduleObserver;
            }
        ]);

})();