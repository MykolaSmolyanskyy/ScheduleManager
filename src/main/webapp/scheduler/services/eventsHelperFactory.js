/*
 * eventsHelperFactory.js
 * Date of creation: 11.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

/**
 * @ngdoc factory
 * @module SchedulingManager
 * @name eventsHelperFactory
 * @description
 * Contains service for sorting user's events by type
 */
(function () {
    'use strict';

    angular.module('SchedulingManager').factory('eventsHelperFactory', ['EVENT_TYPES',
        function (EVENT_TYPES) {
            var _sortEvents,
                birthdayEvents = {
                    color: '#f00',
                    textColor: 'yellow',
                    events: []
                },
                meetingEvents = {
                    color: '#014682',
                    textColor: 'green',
                    events: []
                },
                partyEvents = {
                    color: '#7a43b6',
                    textColor: 'blue',
                    events: []
                };

            _sortEvents = function (events) {
                _.forEach(events, function (evt) {
                    evt.start = new Date(evt.start);
                    switch (evt.type) {
                        case EVENT_TYPES.MEETING:
                        {
                            birthdayEvents.events.push(evt);
                            break;
                        }
                        case EVENT_TYPES.FREE_TIME:
                        {
                            meetingEvents.events.push(evt);
                            break;
                        }
                        case EVENT_TYPES.DEVELOPMENT:
                        {
                            partyEvents.events.push(evt);
                            break;
                        }
                    }
                });

                return [birthdayEvents, partyEvents, meetingEvents];
            };

            return {
                /**
                 * @ngdoc method
                 * @module SchedulingManager
                 * @name eventsHelperFactory#sortEvents
                 * @param {array} events User's events
                 * @return Array of sorted user's events by event type
                 *
                 * @description
                 * Sorts array of user's events by event type
                 */
                sortEvents: _sortEvents
            };
        }
    ]);
})();