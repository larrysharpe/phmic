(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngCookies','ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'angularMoment', 'app.pages', 'ui.bootstrap', 'ui.bootstrap.tpls',
            'app.loginmodal', 'app.acctcreatemodal', 'app.billpaymodal','app.signinagain','app.activatesms','app.recoveryemail',
            'app.forgotpassword',
            'ngPasswordStrength','base64', 'app.modals'
        ]);
})();
