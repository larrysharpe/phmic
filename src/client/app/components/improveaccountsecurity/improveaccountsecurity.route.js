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
                state: 'improveaccountsecurity',
                config: {
                    url: '/improveaccountsecurity',
                    templateUrl: 'app/components/improveaccountsecurity/improveaccountsecurity.html',
                    controller: 'ImproveAccountSecurityController',
                    controllerAs: '$ctrl',
                    title: 'improveaccountsecurity',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-improveaccountsecurity"></i> improveaccountsecurity'
                    }
                }
            }
        ];
    }
})();
