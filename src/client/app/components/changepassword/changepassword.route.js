(function() {
    'use strict';

    angular
        .module('app.changepassword')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'changepassword',
                config: {
                    url: '/changepassword',
                    templateUrl: 'app/components/changepassword/changepassword.html',
                    controller: 'ChangePasswordController',
                    controllerAs: '$ctrl',
                    title: 'changepassword',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-changepassword"></i> changepassword'
                    }
                }
            }
        ];
    }
})();
