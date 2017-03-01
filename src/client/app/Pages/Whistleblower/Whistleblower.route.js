(function() {
    'use strict';

    angular
        .module('app.whistleblower')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'whistleblower',
                config: {
                    url: '/whistleblower-policy',
                    templateUrl: 'app/Pages/Whistleblower/Whistleblower.html',
                    controller: 'WhistleblowerController',
                    controllerAs: '$ctrl',
                    title: 'Whistleblower',
                    theme: 'theme-dark',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-changepassword"></i> changepassword'
                    }
                }
            }
        ];
    }
})();
