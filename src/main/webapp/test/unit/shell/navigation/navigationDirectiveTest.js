/**
 * navigationDirectiveTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('navigationDirectiveTest', function () {
    'use strict';

    var $rootScope,
        $scope,
        $compile,
        ScheduleObserver,
        scheduleObserver,
        authFactory,
        promiseMock,
        successCallback,
        errorCallback,
        $log,
        $location,
        element,
        isAuthenticated,
        username;

    beforeEach(function() {
        module('templates');
        module('SchedulingManager');

        username = 'foo';
        isAuthenticated = true;

        scheduleObserver = {
            notifyScheduleSubscribers: jasmine.createSpy('notifyScheduleSubscribers')
        };

        ScheduleObserver = function() {
            return scheduleObserver;
        };

        promiseMock = {
            then: function(success, error) {
                successCallback = success;
                errorCallback = error;
            }
        };

        authFactory = {
            getUserName: function() { return username; },
            logout: function() { return promiseMock; },
            isAuthenticated: jasmine.createSpy('authFactory.isAuthenticated')
                .and.callFake(function() { return isAuthenticated; })
        };

        $location = {
            path: jasmine.createSpy('$location.path')
        };

        module(function ($provide) {
            $provide.value('ScheduleObserver', ScheduleObserver);
            $provide.value('authFactory', authFactory);
            $provide.value('$location', $location);
        });

        inject(function (_$compile_, _$rootScope_, _$log_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $log = _$log_;
        });
    });

    function createDirective() {
        var template = '<navigation-directive><navigation-directive/>',
            scopeObject = $rootScope.$new();
        element = angular.element(template);
        $compile(element)(scopeObject);
        scopeObject.$digest();
        $scope = element.isolateScope();
    }

    it('should check for authentication', function() {
        createDirective();
        expect(authFactory.isAuthenticated).toHaveBeenCalled();
    });

    it('should redirect unauthenticated user to login page', function() {
        isAuthenticated = false;
        createDirective();
        expect($location.path).toHaveBeenCalledWith('/login');
    });

    it('should set username to sidebar', function() {
        createDirective();
        expect(element.find('ul > li > button').text()).toMatch(username);
    });

    it('should notify schedule subscribers on schedule button click', function() {
        createDirective();
        element.find('ul > li > button').click();
        expect(scheduleObserver.notifyScheduleSubscribers).toHaveBeenCalled();
    });

    it('should collapse menu on menu button click', function() {
        createDirective();
        expect(element.hasClass('sm-navbar-collapsed')).toBe(false);
        element.find('button.navbar-toggler').click();
        expect(element.hasClass('sm-navbar-collapsed')).toBe(true);
    });
});
