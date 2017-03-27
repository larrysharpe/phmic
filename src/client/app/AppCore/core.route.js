(function() {
    'use strict';

    angular
        .module('app.core')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $httpProvider.interceptors.push('AuthIntercept');
        })
        .factory('AuthIntercept', AuthIntercept)
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $rootScope, Auth, $location) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
        });
    }

    AuthIntercept.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];
    /* @ngInject */
    function AuthIntercept($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }

                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };

    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/Pages/404/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
