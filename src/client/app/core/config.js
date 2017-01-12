/* global Modernizr */
(function (Modernizr) {
    'use strict';

    var core = angular.module('app.core');

    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition'   : 'transitionend',
        'OTransition'     : 'oTransitionEnd',
        'msTransition'    : 'MSTransitionEnd',
        'transition'      : 'transitionend'
    };

    var animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation'     : 'oAnimationEnd',
        'msAnimation'    : 'MSAnimationEnd',
        'animation'      : 'animationend'
    };

    var appConfig = {
        appErrorPrefix: '[app Error] ',
        appTitle: 'Pharmacists Mutual',
        browserSupport   : {
            animations : Modernizr.cssanimations,
            transitions: Modernizr.csstransitions
        },
        transEndEventName: transEndEventNames[Modernizr.prefixed('transition')],
        animEndEventName : animEndEventNames[Modernizr.prefixed('animation')]
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
        routerHelperProvider.configure({docTitle: appConfig.appTitle});
    }

})(window.Modernizr);
