(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$base64', '$cookieStore', 'dataservice', '$location', '$q', '$http'];

    function Auth($base64, $cookieStore, dataservice, $location, $q, $http) {
        var svc = {};
        var clientToken = $cookieStore.get('token');
        var currentUser = {};
        if (clientToken) {
            dataservice.getUser().then(function (res) {
                currentUser = res;
            });
        }

        svc.getCurrentUser = function() {
            return currentUser;
        };

        svc.getToken = function() {
            return $cookieStore.get('token');
        };

        svc.isLoggedIn = function() {
            return currentUser.hasOwnProperty('id');
        };

        svc.login = function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('api/auth', {
                email: $base64.encode(user.email),
                password: $base64.encode(user.password)
            })
            .then(function(res) {
                var tkn = (res.data.token) ? res.data.token : res.token;
                $cookieStore.put('token', tkn);
                dataservice.getUser().then(function(res) {
                    currentUser = res;
                });
                deferred.resolve(tkn);
                return cb();
            })
            .catch(function(err) {
                console.log('Caught Error!!!', err);
                this.logout();
                deferred.reject(err);
                return cb(err);
            }.bind(this));

            return deferred.promise;
        };

        svc.logout = function() {
            $cookieStore.remove('token');
            currentUser = {};
            $location.path('/');
        };

        return svc;
    }
})();
