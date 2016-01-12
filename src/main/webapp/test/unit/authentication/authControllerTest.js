/**
 * authControllerTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */


describe('authControllerTest', function () {
    'use strict';

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
            login: jasmine.createSpy('authFactory.login').and.callFake(function () {
                return {
                    then: function(success, error){
                        loginSuccessCallback = success;
                        loginErrorCallback = error;
                    }
                }
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

    it('should call $setDirty on username and password when login form is invalid', function () {
        createController();
        scope.loginForm = {
            $invalid: true,
            password:{
                $setDirty: jasmine.createSpy('password.$setDirty')
            },
            username:{
                $setDirty: jasmine.createSpy('password.username')
            }
        };

        scope.logIn();
        expect(scope.loginForm.password.$setDirty).toHaveBeenCalled();
        expect(scope.loginForm.username.$setDirty).toHaveBeenCalled();
    });

    it('should call authFactory.login', function () {
        createController();
        scope.loginForm = {
            $invalid: false
        };

        scope.logIn();
        expect(authFactory.login).toHaveBeenCalled();
    });

    it('should execute success callback after authFactory.login and call $location.path', function () {
        var data = {
            username: 'username'
        };

        createController();
        scope.loginForm = {
            $invalid: false
        };

        scope.logIn();
        loginSuccessCallback(data);
        expect(location.path).toHaveBeenCalled();
    });

    it('should execute success callback after authFactory.login and set $scope.loginError', function () {
        var data = 'error';

        createController();
        scope.loginForm = {
            $invalid: false
        };

        scope.logIn();
        loginSuccessCallback(data);
        expect(scope.loginError).toEqual(data);
    });

    it('should execute error callback after authFactory.login and call log.error', function () {
        createController();
        scope.loginForm = {
            $invalid: false
        };

        scope.logIn();
        loginErrorCallback();
        expect(log.error).toHaveBeenCalled();
    });
});