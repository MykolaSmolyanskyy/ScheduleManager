/**
 * authControllerTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */


describe('authControllerTest', function () {
    var scope = {},
        authFactory,
        location,
        log,
        loginSuccessCallback,
        loginErrorCallback,
        $controllerConstructor;


    beforeEach(function () {
        module('SchedulingManager');

        authFactory = {
            login: jasmine.createSpy('authFactory.login').and.callFake(function (success, error) {
                loginSuccessCallback = success;
                loginErrorCallback = error;
            }),
            isAuthenticated: jasmine.createSpy('authFactory.isAuthenticated')
        };

        module(function ($provide) {
            $provide.value('authFactory', authFactory);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, _$location_, _$log_) {
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
        location = _$location_;
        location.path = jasmine.createSpy('location.path');
        log = _$log_;
        log.error = jasmine.createSpy('log.error');
    }));

    function createController() {
        var ctrl = $controllerConstructor('AuthController', {$scope: scope});
        expect(ctrl).toBeDefined();
    }

    it('should define initial values', function () {
        createController();
        expect(scope.currentUser).toBeDefined();
        expect(scope.logIn).toBeDefined();
    });
});