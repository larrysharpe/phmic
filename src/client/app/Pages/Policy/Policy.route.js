(function() {
    'use strict';

    angular
        .module('app.policy')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'policy',
                config: {
                    url: '/policy/:id',
                    templateUrl: 'app/Pages/Policy/Policy.html',
                    controller: 'PolicyController',
                    controllerAs: '$ctrl',
                    title: 'policy',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-policy"></i> policy'
                    }
                }
            }
        ];
    }
})();
