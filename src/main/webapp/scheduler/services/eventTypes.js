/*
 * eventTypes.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */
(function () {
    'use strict';

    angular.module('SchedulingManager').constant('EVENT_TYPES', {
            DEVELOPMENT: 'Development',
            FREE_TIME: 'Free time',
            MEETING: 'Meeting'
        }
    );
})();