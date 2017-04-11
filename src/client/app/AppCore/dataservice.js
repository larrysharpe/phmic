(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', '$base64', 'DataUrls', 'ServerBase'];
    /* @ngInject */
    function dataservice($http, $q, exception,  $base64, DataUrls, ServerBase) {
        var deferred = $q.defer();

        var service = {
            getUser: getUser,
            getPeople: getPeople,
            getPerson: getPerson,
            getMessageCount: getMessageCount,
            login: login,
            getPolicy: getPolicy,
            getPolicies: getPolicies,
            createAccessCode: createAccessCode,
            resendAccessCode: resendAccessCode,
            createAccessPoint: createAccessPoint,
            createUserAccount: createUserAccount,
            passwordReset: passwordReset,
            requestPasswordReset:requestPasswordReset,
            passwordResetToken: passwordReset
        };

        return service;

        function passwordReset (email) {
            var obj = {
                email: email
            };

            $http.post(ServerBase + DataUrls.POST_RESETPASSWORD, obj)
                .then(function(res) {
                    deferred.resolve(res);
                },function(res) {
                    deferred.resolve(res);
                });

            return deferred.promise;
        }

        function passwordResetToken (email) {
            var obj = {
                email: email
            };

            $http.post(ServerBase + DataUrls.POST_RESETPASSWORDTOKEN, obj)
                .then(function(res) {
                    deferred.resolve(res);
                },function(res) {
                    deferred.resolve(res);
                });

            return deferred.promise;
        }
        function requestPasswordReset (email) {
            var obj = {
                email: email
            };

            $http.post(ServerBase + DataUrls.POST_REQUESTRESETPASSWORD, obj)
                .then(function(res) {
                    deferred.resolve(res);
                },function(res) {
                    deferred.resolve(res);
                });

            return deferred.promise;
        }

        function getMessageCount() { return $q.when(72); }
        function errorMsg (msg, field) {
            return {
                status: 'error',
                msg: msg,
                field: field
            };
        }
        function getUser () {
            var d = $q.defer();

            $http.get(ServerBase + DataUrls.GET_USER)
            .then(function(res) {
                var usr = (res.data) ? res.data : res;
                d.resolve(usr);
            })
            .catch(function(err) {
                d.reject(err);
            });

            return d.promise;
        }
        function login (user, callback) {
            var cb = callback || angular.noop;
            return $http.post(ServerBase + DataUrls.POST_LOGIN, {
                email: user.email,
                password: user.password
            })
            .then(function(res) {
                deferred.resolve(res);
                return cb(res);
            })
            .catch(function(err) {
                deferred.reject(err);
                return cb(err);
            });
        }
        function getPerson (id) {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get(ServerBase + DataUrls.GET_CLIENTS + id)
                .then(success)
                .catch(fail);

        }
        function getPolicies (id) {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get(ServerBase + DataUrls.GET_POLICIES + id)
                .then(success)
                .catch(fail);

        }
        function getPolicy (id) {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get(ServerBase + DataUrls.GET_POLICIES + id)
                .then(success)
                .catch(fail);

        }
        function getPeople() {

            var success = function (response) {
                return response.data;
            };

            var fail = function (e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get(ServerBase + DataUrls.GET_CLIENTS)
                .then(success)
                .catch(fail);

        }
        function createAccessCode (email, customerNumber) {
            var obj = {
                email: email,
                customerNumber: customerNumber
            };
            return $http.post(ServerBase + DataUrls.POST_CREATEACCESSCODE, obj)
                .then(function(res) { return res; })
                .catch(function(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                });
        }
        function resendAccessCode (email, customerNumber) {
            var obj = {
                email: email,
                customerNumber: customerNumber
            };
            return $http.post(ServerBase + DataUrls.POST_RESENDACCESSCODE, obj)
                .then(function(res) { return res; })
                .catch(function(e) {
                    return exception.catcher('XHR Failed for resendAccessCode')(e);
                });
        }
        function createAccessPoint (email, customerNumber, accessCode) {
            var obj = {
                email: email,
                customerNumber: customerNumber,
                accessCode: accessCode
            };
            return $http.post(ServerBase + DataUrls.POST_CREATEACCESSPOINT, obj)
                .then(function(res) { return res; })
                .catch(function(e) {
                    return exception.catcher('XHR Failed for createAccessPoint')(e);
                });
        }
        function createUserAccount (user) {
            var obj = {
                email: user.email,
                customerNumber: user.customerno,
                password: $base64.encode(user.password)
            };
            return $http.post(ServerBase + DataUrls.POST_CREATEUSERACCOUNT, obj)
                .then(function(res) { return res; })
                .catch(function(e) {
                    return exception.catcher('XHR Failed for createUserAccount')(e);
                });
        }
    }
})();
