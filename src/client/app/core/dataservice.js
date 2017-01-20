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
            getMessageCount: getMessageCount,
            getLogin: getLogin
        };

        return service;

        function getMessageCount() { return $q.when(72); }


        var sampleLogin = {
            email: 'larry.l.sharpe@gmail.com',
            password: '12345'
        }


        function getLogin (email, password){
            if (email !== sampleLogin.email) {
                return {
                    status: 'error',
                    msg: 'We do not recognize that email address. Check your spelling or click below if you need help.'
                }
            }else if (password !== sampleLogin.password){
                return {
                    status: 'error',
                    msg: 'That password is incorrect. Try again or click below for assistance.'
                }
            }

        }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }


    }
})();
