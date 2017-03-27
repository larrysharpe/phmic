(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$base64', '$cookieStore', 'dataservice', '$location', '$q'];
    /* @ngInject */
    function Auth($base64, $cookieStore, dataservice, $location, $q) {

        var currentUser = {};
        var loggedIn = false;
        var deferred = $q.defer();

        var getToken = function() {
            return $cookieStore.get('token');
        };

        var getUser = function () {
            console.log(currentUser);
            return currentUser;
        };

        var loadUser = function () {
            dataservice.getUser().then(function(user) {
                currentUser = user.data;
                deferred.resolve(currentUser);
                return currentUser;
            });
        };

        var isLoggedIn = function () {
            return loggedIn;
        };

        var processLogin = function (token) {
            loggedIn = true;
            $cookieStore.put('token', token);
            loadUser();
        };

        var login = function(user, callback) {
            var email = $base64.encode(user.email);
            var password = $base64.encode(user.password);

            return dataservice.login({
                email: email,
                password: password
            }, function(tokendata) {
                processLogin(tokendata.data.token);
            });
        };

        var logout = function () {
            $cookieStore.remove('token');
            loggedIn = false;
            currentUser = {};
            console.log('go home');
            $location.path('/');
        };



        if ($cookieStore.get('token')) {
            loadUser();
        }

        var service = {
            getUser: getUser,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            processLogin: processLogin
        };

        return service;
    }
})();
