(function() {
    'use strict';

    angular
        .module('app.news')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'news',
                config: {
                    url: '/news-archive',
                    templateUrl: 'app/Pages/News/News.html',
                    controller: 'NewsController',
                    controllerAs: '$ctrl',
                    title: 'News',
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
