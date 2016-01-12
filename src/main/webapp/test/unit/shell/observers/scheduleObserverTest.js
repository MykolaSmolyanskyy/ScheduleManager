/**
 * scheduleObserverTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('scheduleObserverTest', function () {
    'use strict';

    var observer;

    beforeEach(module('SchedulingManager'));
    beforeEach(inject(function (ScheduleObserver) {
        observer = new ScheduleObserver();
    }));

    it('should define "notifyScheduleSubscribers" public method', function() {
        expect(observer.notifyScheduleSubscribers).toBeDefined();
        expect(typeof observer.notifyScheduleSubscribers).toBe('function');
    });

    it('should put given callback to the list of subscribers', function() {
        var callback = jasmine.createSpy('callback');
        observer.subscribe(callback);
        observer.notifyScheduleSubscribers();
        expect(callback).toHaveBeenCalled();
    });

    it('should remove given callback from the list of subscribers', function() {
        var callback = jasmine.createSpy('callback');
        observer.subscribe(callback);
        observer.unsubscribe(callback);
        observer.notifyScheduleSubscribers();
        expect(callback).not.toHaveBeenCalled();
    });
});
