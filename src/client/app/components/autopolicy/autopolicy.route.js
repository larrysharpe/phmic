(function() {
    'use strict';

    angular
        .module('app.autopolicy')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'autopolicy',
                config: {
                    url: '/autopolicy',
                    templateUrl: 'app/components/autopolicy/autopolicy.html',
                    controller: 'AutopolicyController',
                    controllerAs: '$ctrl',
                    title: 'Autopolicy',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-autopolicy"></i> Autopolicy'
                    }
                }
            }
        ];
    }
})();
