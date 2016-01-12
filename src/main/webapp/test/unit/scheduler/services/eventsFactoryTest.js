/**
 * eventsFactoryTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('eventsFactoryTest', function () {
    'use strict';

    var eventsFactory,
        successEventsClb,
        errorEventsClb,
        q,
        log,
        http,
        errorParam,
        successParam,
        deferred = {
            resolve: jasmine.createSpy('resolve').and.callFake(function (param) {
                successParam = param;
            }),
            reject: jasmine.createSpy('reject').and.callFake(function (param) {
                errorParam = param;
            }),
            promise: jasmine.createSpy('promise')
        };


    beforeEach(module('SchedulingManager'));

    beforeEach(inject(function (_eventsFactory_, _$http_, _$q_, _$log_) {
        eventsFactory = _eventsFactory_;
        http = _$http_;
        http.get = jasmine.createSpy('http.post').and.callFake(function () {
            return {
                success: function (clb) {
                    successEventsClb = clb;
                    return this;
                },
                error: function (clb) {
                    errorEventsClb = clb;
                    return this;
                }
            }
        });
        q = _$q_;
        q.defer = function () {
            return deferred;
        };
        log = _$log_;
        log.error = jasmine.createSpy('log.error');
    }));

    describe('getEventsByUserId', function () {
        it('should call http get method', function () {
            eventsFactory.getEventsByUserId();
            expect(http.get).toHaveBeenCalled();
        });

        it('should return promise and resolve it with events array', function () {
            var events = [1, 2, 3];

            eventsFactory.getEventsByUserId();
            successEventsClb(events);
            expect(deferred.resolve).toHaveBeenCalled();
            expect(successParam).toEqual(events);
        });

        it('should return promise and reject it with error', function () {
            var error = 'error';

            eventsFactory.getEventsByUserId();
            errorEventsClb(error);
            expect(deferred.reject).toHaveBeenCalled();
            expect(errorParam).toEqual(error);
            expect(log.error).toHaveBeenCalled();
        });
    });
});