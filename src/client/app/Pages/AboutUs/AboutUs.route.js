(function() {
    'use strict';

    angular
        .module('app.aboutus')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'about-us',
                config: {
                    url: '/about-us',
                    templateUrl: 'app/Pages/AboutUs/AboutUs.html',
                    controller: 'AboutUsController',
                    controllerAs: '$ctrl',
                    title: 'About Us',
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
