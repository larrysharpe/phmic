(function () {
    'use strict';

    var core = angular.module('app.core');

    var appConfig = {
        appErrorPrefix: '[silentDrop Error] ',
        appTitle: 'silentDrop'
    };

    core.value('appConfig', appConfig);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(appConfig.appErrorPrefix);
        routerHelperProvider.configure({docTitle: appConfig.appTitle + ': '});
    }

})();
