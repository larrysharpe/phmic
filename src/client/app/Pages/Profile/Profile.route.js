(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/Pages/Profile/Profile.html',
                    controller: 'ProfileController',
                    controllerAs: '$ctrl',
                    title: 'profile',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-profile"></i> profile'
                    }
                }
            }
        ];
    }
})();