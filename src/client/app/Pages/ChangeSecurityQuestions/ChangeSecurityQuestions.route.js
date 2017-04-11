(function() {
    'use strict';

    angular
        .module('app.changesecurityquestions')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'changesecurityquestions',
                config: {
                    url: '/changesecurityquestions',
                    templateUrl: 'app/Pages/ChangeSecurityQuestions/ChangeSecurityQuestions.html',
                    controller: 'ChangeSecurityQuestionsController',
                    controllerAs: '$ctrl',
                    title: 'changesecurityquestions',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-changesecurityquestions"></i> changesecurityquestions'
                    }
                }
            }
        ];
    }
})();
