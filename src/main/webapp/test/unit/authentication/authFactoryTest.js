/**
 * authFactoryTest.js
 * Date of creation: 12.01.2016
 *
 * Copyright Mykola Smolyanskyy
 */

describe('authFactoryTest', function () {
    'use strict';

    var auth,
        successLoginClb,
        errorLoginClb,
        q,
        cookies,
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

    beforeEach(inject(function (_authFactory_, _$cookies_, _$http_, _$q_) {
        auth = _authFactory_;
        cookies = _$cookies_;
        cookies.get = jasmine.createSpy('cookies.get').and.returnValue('value');
        cookies.remove = jasmine.createSpy('cookies.remove');
        http = _$http_;
        http.post = jasmine.createSpy('http.post').and.callFake(function () {
            return {
                success: function (clb) {
                    successLoginClb = clb;
                    return this;
                },
                error: function (clb) {
                    errorLoginClb = clb;
                    return this;
                }
            }
        });

        http.get = jasmine.createSpy('http.post').and.callFake(function () {
            return {
                success: function (clb) {
                    successLoginClb = clb;
                    return this;
                },
                error: function (clb) {
                    errorLoginClb = clb;
                    return this;
                }
            }
        });
        q = _$q_;
        q.defer = function () {
            return deferred;
        }
    }));

    describe('login', function () {
        it('should return promise and resolve it with error message', function () {
            auth.login({username: '', password: ''});
            expect(http.post).toHaveBeenCalled();
            errorLoginClb('error', 401);
            expect(deferred.resolve).toHaveBeenCalled();
            expect(successParam).toEqual('Error. Please check your credentials.');
        });

        it('should return promise and resolve it with data', function () {
            auth.login({username: '', password: ''});
            expect(http.post).toHaveBeenCalled();
            successLoginClb('user');
            expect(deferred.resolve).toHaveBeenCalled();
            expect(successParam).toEqual('user');
        });

        it('should return promise and call deferred.reject', function () {
            auth.login({username: '', password: ''});
            expect(http.post).toHaveBeenCalled();
            errorLoginClb('error');
            expect(deferred.reject).toHaveBeenCalled();
            expect(errorParam).toEqual('error');
        });
    });

    describe('logout', function () {
        it('should return promise and resolve it with data', function () {
            auth.logout({username: '', password: ''});
            expect(http.get).toHaveBeenCalled();
            successLoginClb('user');
            expect(deferred.resolve).toHaveBeenCalled();
            expect(successParam).toEqual('user');
        });

        it('should return promise and call deferred.reject', function () {
            auth.logout({username: '', password: ''});
            expect(http.get).toHaveBeenCalled();
            errorLoginClb('error');
            expect(deferred.reject).toHaveBeenCalled();
            expect(errorParam).toEqual('error');
        });
    });

    describe('getUserName', function () {
        it('should return username', function () {
            var username = auth.getUserName();

            expect(username).toBeDefined();
            expect(username).toEqual('value');
        });

        it('should return null', function () {
            cookies.get = function () {
                return null;
            };
            spyOn(cookies, 'get').and.callThrough();

            var username = auth.getUserName();

            expect(username).toBeNull();
        });
    });

    describe('getUserId', function () {
        it('should return id', function () {
            var id = auth.getUserId();

            expect(id).toBeDefined();
            expect(id).toEqual('value');
        });

        it('should return null', function () {
            cookies.get = function () {
                return null;
            };
            spyOn(cookies, 'get').and.callThrough();

            var id = auth.getUserId();

            expect(id).toBeNull();
        });
    });

    describe('isAuthenticated', function () {
        it('should return true', function () {
            var isAuthenticated = auth.isAuthenticated();

            expect(isAuthenticated).toBeTruthy();
        });

        it('should return false', function () {
            cookies.get = function () {
                return null;
            };
            spyOn(cookies, 'get').and.callThrough();

            var isAuthenticated = auth.isAuthenticated();

            expect(isAuthenticated).toBeFalsy();
        });
    });

    describe('clearCookies', function () {
        it('should call cookies remove twice', function () {
            auth.clearCookies();
            expect(cookies.remove).toHaveBeenCalledTimes(2);
        });
    });
});