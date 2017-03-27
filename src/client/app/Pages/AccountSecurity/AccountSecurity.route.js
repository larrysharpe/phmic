(function() {
    'use strict';

    angular
        .module('app.improveaccountsecurity')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'AccountSecurity',
                config: {
                    url: '/accountsecurity',
                    templateUrl: 'app/Pages/AccountSecurity/AccountSecurity.html',
                    controller: 'AccountSecurityController',
                    controllerAs: '$ctrl',
                    title: 'Account Security',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-accountsecurity"></i> improveaccountsecurity'
                    }
                }
            }
        ];
    }
})();
