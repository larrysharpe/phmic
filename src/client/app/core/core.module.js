(function () {
    'use strict';

    angular

        .module('app.pages', ['app.policy','app.profile','app.changepassword','app.changesecurityquestions','app.improveaccountsecurity',
            'app.aboutus', 'app.careers', 'app.contact', 'app.news', 'app.privacypolicy', 'app.whistleblower']);
    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'angularMoment', 'app.pages',
            'app.loginmodal', 'app.acctcreatemodal', 'app.billpaymodal','app.signinagain','app.activatesms','app.recoveryemail',
            'ngPasswordStrength'
        ]);
})();
