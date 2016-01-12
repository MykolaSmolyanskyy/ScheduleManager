/**
 * schedulerControllerTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */


describe('schedulerControllerTest', function () {
    'use strict';

    var scope = {},
        authFactory,
        location,
        log,
        compile,
        eventsFactory,
        eventsHelperFactory,
        ScheduleObserver,
        observerObj,
        observerCallback,
        successCallback,
        errorCallback,
        $controllerConstructor;


    beforeEach(function () {
        module('SchedulingManager');

        observerObj = {
            subscribe: jasmine.createSpy('observerObj.subscribe').and.callFake(function (clb) {
                observerCallback = clb;
            }),
            unsubscribe: jasmine.createSpy('observerObj.unsubscribe')
        };

        ScheduleObserver = function () {
            return observerObj;
        };

        eventsFactory = {
            getEventsByUserId: jasmine.createSpy('eventsFactory.getEventsByUserId').and.callFake(function () {
                return {
                    then: function (success, error) {
                        successCallback = success;
                        errorCallback = error;
                    }
                }
            })
        };

        eventsHelperFactory = {
            sortEvents: jasmine.createSpy('eventsHelperFactory.sortEvents').and.callFake(function (params) {
                return params;
            })
        };

        authFactory = {
            getUserId: jasmine.createSpy('authFactory.getUserId').and.returnValue(1),
            isAuthenticated: jasmine.createSpy('authFactory.isAuthenticated')
        };

        module(function ($provide) {
            $provide.value('authFactory', authFactory);
            $provide.value('eventsHelperFactory', eventsHelperFactory);
            $provide.value('eventsFactory', eventsFactory);
            $provide.value('ScheduleObserver', ScheduleObserver);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, _$location_, _$log_, _$compile_) {
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
        location = _$location_;
        location.path = jasmine.createSpy('location.path');
        log = _$log_;
        log.error = jasmine.createSpy('log.error');
        compile = _$compile_;
    }));

    function createController() {
        var ctrl = $controllerConstructor('SchedulerController', {$scope: scope});
        expect(ctrl).toBeDefined();
    }

    it('should define initial values', function () {
        createController();
        expect(scope.events).toEqual([]);
        expect(scope.eventSources).toEqual([]);
        expect(scope.scheduleButtonClicked).toBeFalsy();
    });

    it('should call observer subscribe', function () {
        createController();
        expect(observerObj.subscribe).toHaveBeenCalled();
    });

    it('should call observer unsubscribe', function () {
        spyOn(scope, '$on').and.callFake(function(param, clb){
            clb();
        });
        createController();
        expect(observerObj.unsubscribe).toHaveBeenCalled();
    });

    it('should call observer callback and call eventsFactory.getEventsByUserId', function () {
        createController();
        observerCallback();
        expect(eventsFactory.getEventsByUserId).toHaveBeenCalled();
    });

    it('should call eventsFactory successCallback and call eventsHelperFactory.sortEvents', function () {
        var events = [1,2,3];

        createController();
        observerCallback();
        successCallback(events);
        expect(eventsHelperFactory.sortEvents).toHaveBeenCalled();
    });

    it('should call eventsFactory successCallback and populate scope.events', function () {
        var events = [1,2,3];

        createController();
        observerCallback();
        successCallback(events);
        expect(scope.events).toEqual(events);
    });

    it('should define configurations for calendar', function () {
        var events = [1,2,3];

        createController();
        observerCallback();
        successCallback(events);
        expect(scope.eventSource).toBeDefined();
        expect(scope.eventRender).toBeDefined();
        expect(scope.eventSources).toBeDefined();
    });

    it('should call log error on error callback', function () {
        var error = 'error';

        createController();
        observerCallback();
        errorCallback(error);
        expect(log.error).toHaveBeenCalled();
    });
});