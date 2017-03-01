(function () {
    'use strict';

    angular
        .module('app.acctcreatemodal')
        .controller('AcctcreatemodalController', AcctcreatemodalController);

    AcctcreatemodalController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance'];
    /* @ngInject */
    function AcctcreatemodalController($q, dataservice, logger, $uibModalInstance) {
        var $ctrl  = this;

        $ctrl.currentStep = 1;
        $ctrl.totalSteps = 4;
        $ctrl.fillWidth = 0;
        $ctrl.showStepControls = true;
        $ctrl.showCancelConfirmation = false;
        $ctrl.acct = {};

        $ctrl.showNextStep = function () {
            return $ctrl.currentStep < ($ctrl.totalSteps - 1);
        };
        $ctrl.showLastStep = function () {
            return $ctrl.currentStep === ($ctrl.totalSteps - 1);
        };
        $ctrl.showComplete = function () {
            return $ctrl.currentStep === $ctrl.totalSteps;
        };

        $ctrl.nextStep = function () {
            $ctrl.currentStep++;
            $ctrl.fillWidth =  (($ctrl.currentStep - 1) / $ctrl.totalSteps) * 100 ;
        };

        var showCancelConfirmation = function () {
            $ctrl.showStepControls = false;
            $ctrl.showCancelConfirmation = true;
        };

        $ctrl.cancelCreation = function () {
            if ($ctrl.currentStep === 1) { $ctrl.closeModal(); }
            else { showCancelConfirmation(); }
        };

        $ctrl.closeConfirmation = function () {
            $ctrl.showStepControls = true;
            $ctrl.showCancelConfirmation = false;
        };

        $ctrl.checkPasswordLength = function () {
            if ($ctrl.acct.password) { return $ctrl.acct.password.length >= 10; }
        };

        $ctrl.checkForLowercase = function () {
            if ($ctrl.acct.password) { return (/[a-z]/.test($ctrl.acct.password)); }
        };

        $ctrl.checkForUppercase = function () {
            if ($ctrl.acct.password) { return (/[A-Z]/.test($ctrl.acct.password)); }
        };

        $ctrl.checkForNumber = function () {
            if ($ctrl.acct.password) { return (/[0-9]/.test($ctrl.acct.password)); }
        };

        $ctrl.checkForWords = function () {
            if ($ctrl.acct.password) { return (/password/.test($ctrl.acct.password)); }
        };

        $ctrl.hasRepeatedLetters = function () {
            if ($ctrl.acct.password) { return (/^([\w\W])\1+$/.test($ctrl.acct.password)); }
        };

        $ctrl.showConfirm = function () {
            return (!$ctrl.checkForWords() && !$ctrl.hasRepeatedLetters() && $ctrl.checkForNumber() &&
            $ctrl.checkForLowercase() && $ctrl.checkForUppercase() && $ctrl.checkPasswordLength());
        };

        $ctrl.loginattempts = 0;
        $ctrl.loginFormSection = 'yo';
        $ctrl.acctLockedSectionOpen = '';
        $ctrl.logginInSectionOpen = '';

        var openLoginForm = function () {
            $ctrl.loginFormSection = 'open';
        };
        var openAcctLocked = function () {
            $ctrl.acctLockedSectionOpen = 'open';
        };
        var openLoggingIn = function () {
            $ctrl.logginInSectionOpen = 'open';
        };
        var closeLoginForm = function () {
            $ctrl.loginFormSection = '';
        };
        var closeAcctLocked = function () {
            $ctrl.acctLockedSectionOpen = '';
        };
        var closeLoggingIn = function () {
            $ctrl.logginInSectionOpen = '';
        };

        var enableAcctLocked = function () {
            openAcctLocked();
            closeLoginForm();
            closeAcctLocked();
        };
        var enableLoginForm = function () {
            closeLoggingIn();
            closeAcctLocked();
            openLoginForm();
        };

        var loginFailed = function () {
            if ($ctrl.loginattempts > 2) { enableAcctLocked(); }
            else { enableLoginForm(); }
        };

        var attemptLogin = function () {
            $ctrl.loginattempts++;
            openLoggingIn();
            closeLoginForm();
            loginFailed();
        };

        $ctrl.loginFailed = loginFailed;

        $ctrl.attemptLogin = function () {
            attemptLogin();
        };

        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        };

    }
})();
