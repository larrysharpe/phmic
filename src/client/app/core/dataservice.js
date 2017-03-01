(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPeople: getPeople,
            getPerson: getPerson,
            getMessageCount: getMessageCount,
            getLogin: getLogin,
            getPolicy: getPolicy
        };

        return service;

        function getMessageCount() { return $q.when(72); }



        function errorMsg (msg, field) {
            return {
                status: 'error',
                msg: msg,
                field: field
            };
        }

        function getLogin (user){
            var sampleLogin = {
                email: 'larry.l.sharpe@gmail.com',
                password: '12345'
            };

            var $error;


            if (!user.email) {
                $error =  errorMsg('No email address was provided.', 'email');
            }else if (!user.password) {
                $error =  errorMsg('No password was provided.', 'password');
            }else if (user.email !== sampleLogin.email) {
                $error =  errorMsg('We do not recognize that email address. Check your spelling or click below if you need help.', 'email');
            }else if (user.password !== sampleLogin.password){
                $error =  errorMsg('That password is incorrect. Try again or click below for assistance.', 'password');
            }

            if ($error) {
                return $q.when($error);
            } else {
                return $q.when(
                    {
                        status: 'success'
                    }
                );
            }

        }

        function getPerson(id) {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get('/api/people/' + id )
                .then(success)
                .catch(fail);

        }
        function getPolicy(id) {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get('/api/policy/' + id )
                .then(success)
                .catch(fail);

        }

        function getPeople() {

            var success = function (response) {
                return response.data;
            };

            var fail = function(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            };

            return $http.get('/api/people')
                .then(success)
                .catch(fail);

        }
    }
})();
