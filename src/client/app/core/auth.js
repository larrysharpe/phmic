(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$http', '$q'];
    /* @ngInject */
    function Auth($http, $q) {

        var user = {};

        var getUser = function (){
            return user;
        }
        var login = function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/api/login', {
                email: user.email,
                password: user.password
            })
            .then(function(response){
                return response.data;
            });

            return deferred.promise;
        }
        var logout = function (){}

        var service = {
            login: login,
            logout: logout,
            getUser: getUser
        };

        return service;
    }
})();
