/**
 * baseObserverTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('baseObserverTest', function () {
    'use strict';

    var baseObserver,
        subscribers;

    beforeEach(module('SchedulingManager'));
    beforeEach(inject(function (BaseObserver) {
        subscribers = [];
        baseObserver = new BaseObserver(subscribers);
    }));

    it('should define "subscribe" public method', function() {
        expect(baseObserver.subscribe).toBeDefined();
        expect(typeof baseObserver.subscribe).toBe('function');
    });

    it('should define "notifySubscribers" public method', function() {
        expect(baseObserver.unsubscribe).toBeDefined();
        expect(typeof baseObserver.unsubscribe).toBe('function');
    });

    it('should define "notifySubscribers" public method', function() {
        expect(baseObserver.notifySubscribers).toBeDefined();
        expect(typeof baseObserver.notifySubscribers).toBe('function');
    });

    it('should put given callback to the list of subscribers', function() {
        var callback = jasmine.createSpy('callback'),
            payload = {};
        baseObserver.subscribe(callback);
        baseObserver.notifySubscribers(payload);
        expect(callback).toHaveBeenCalledWith(payload);
    });

    it('should remove given callback from the list of subscribers', function() {
        var callback = jasmine.createSpy('callback'),
            payload = {};
        baseObserver.subscribe(callback);
        baseObserver.unsubscribe(callback);
        baseObserver.notifySubscribers(payload);
        expect(callback).not.toHaveBeenCalled();
    });
});
