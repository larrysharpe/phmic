(function() {
    'use strict';

    angular
        .module('app.careers')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'careers',
                config: {
                    url: '/career-opportunities',
                    templateUrl: 'app/Pages/Careers/Careers.html',
                    controller: 'CareersController',
                    controllerAs: '$ctrl',
                    title: 'Careers',
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
