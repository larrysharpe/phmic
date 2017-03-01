(function() {
    'use strict';

    angular
        .module('app.contact')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'contact',
                config: {
                    url: '/contact',
                    templateUrl: 'app/Pages/Contact/Contact.html',
                    controller: 'ContactController',
                    controllerAs: '$ctrl',
                    title: 'Contact',
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
