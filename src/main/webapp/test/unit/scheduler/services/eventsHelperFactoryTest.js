/**
 * eventsHelperFactoryTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('eventsHelperFactoryTest', function () {
    'use strict';

    var eventsHelper;


    beforeEach(module('SchedulingManager'));

    beforeEach(inject(function (_eventsHelperFactory_) {
        eventsHelper = _eventsHelperFactory_;
    }));

    describe('sortEvents', function () {
        it('should return array of sorted events by type of event', function () {
            var events = [{type: 'Meeting'}, {type: 'Free time'}, {type: 'Development'}],
                res;

            res = eventsHelper.sortEvents(events);
            expect(res).toBeDefined();
            expect(res).toEqual([
                {
                    color: '#f00',
                    textColor: 'yellow',
                    events: [events[0]]
                },
                {
                    color: '#014682',
                    textColor: 'green',
                    events: [events[1]]
                },
                {
                    color: '#7a43b6',
                    textColor: 'blue',
                    events: [events[2]]
                }])
        });
    });
});