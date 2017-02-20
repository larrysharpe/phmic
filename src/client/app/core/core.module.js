(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'angularMoment',
            'app.loginmodal', 'app.acctcreatemodal', 'app.billpaymodal','app.signinagain',
            'app.policy','app.profile','app.changepassword','app.changesecurityquestions','app.improveaccountsecurity',
            'ngPasswordMeter'
        ]);
})();
