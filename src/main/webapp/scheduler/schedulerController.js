/*
 * schedulerController.js
 * Date of creation: 11.01.2016
 *
 * Copyright (c) CompuGroup Medical Software
 */

/**
 * @ngdoc controller
 * @module SchedulingManager
 * @name SchedulerController
 * @description
 * Contains logic for managing user's events
 */

app.controller('SchedulerController', [
    '$scope',
    '$location',
    'authFactory',
    '$log',
    '$compile',
    'eventsFactory',
    'eventsHelperFactory',
    function ($scope, $location, authFactory, $log, $compile, eventsFactory, eventsHelperFactory) {
        $scope.username = authFactory.getUserName();
        $scope.events = [];
        $scope.eventSources = [];

        var init = function () {
            /* event source that pulls from google.com */
            $scope.eventSource = {
                className: 'gcal-event',           // configured option
                currentTimezone: 'America/Chicago' // configured option
            };

            /* Render Tooltip */
            $scope.eventRender = function (event, element) {
                element.attr({
                    'uib-tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };

            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: false,
                    handleWindowResize: true,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next, month, agendaWeek, agendaDay'
                    },
                    businessHours: {
                        start: '10:00', // a start time (10am in this example)
                        end: '18:00', // an end time (6pm in this example)
                        dow: [1, 2, 3, 4, 5]
                    },
                    eventRender: $scope.eventRender
                }
            };

            /* event sources array*/
            for (var i = 0; i < $scope.events.length; i++) {
                $scope.eventSources.push($scope.events[i]);
            }
            $scope.eventSources.push($scope.eventSource);
        };

        eventsFactory.getEventsByUserId(authFactory.getUserId()).then(function (events) {
            var res = eventsHelperFactory.sortEvents(events);
            for (var i = 0; i < res.length; i++) {
                $scope.events.push(res[i]);
            }
            init();
        }, function (err) {
            $log.error(err);
        });
    }
]);