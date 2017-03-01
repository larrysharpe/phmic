(function() {
    'use strict';

    angular
        .module('app.privacypolicy')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'privacy-policy',
                config: {
                    url: '/privacy-policy',
                    templateUrl: 'app/Pages/PrivacyPolicy/PrivacyPolicy.html',
                    controller: 'PrivacyPolicyController',
                    controllerAs: '$ctrl',
                    title: 'Privacy Policy',
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
