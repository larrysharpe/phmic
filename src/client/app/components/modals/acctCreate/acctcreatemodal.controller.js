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

        $ctrl.showNextStep = function (){
            return $ctrl.currentStep < ($ctrl.totalSteps - 1);
        }
        $ctrl.showLastStep = function (){
            return $ctrl.currentStep === ($ctrl.totalSteps - 1);
        }
        $ctrl.showComplete = function (){
            return $ctrl.currentStep === $ctrl.totalSteps;
        }

        $ctrl.nextStep = function (){
            $ctrl.currentStep++;
            $ctrl.fillWidth =  (($ctrl.currentStep - 1) / $ctrl.totalSteps) * 100 ;
        }

        $ctrl.cancelCreation = function (){
            if ($ctrl.currentStep == 1) $ctrl.closeModal();
            else showCancelConfirmation();
        }

        $ctrl.closeConfirmation = function (){
            $ctrl.showStepControls = true;
            $ctrl.showCancelConfirmation = false;
        }

        var showCancelConfirmation = function (){
            $ctrl.showStepControls = false;
            $ctrl.showCancelConfirmation = true;
        }

        $ctrl.loginattempts = 0;
        $ctrl.loginFormSection = 'yo';
        $ctrl.acctLockedSectionOpen = '';
        $ctrl.logginInSectionOpen = '';


        var openLoginForm = function () {
            $ctrl.loginFormSection = 'open';
        }
        var openAcctLocked = function () {
            $ctrl.acctLockedSectionOpen = 'open';
        }
        var openLoggingIn = function () {
            $ctrl.logginInSectionOpen = 'open';
        }

        var closeLoginForm = function () {
            $ctrl.loginFormSection = '';
        }
        var closeAcctLocked = function () {
            $ctrl.acctLockedSectionOpen = '';
        }
        var closeLoggingIn = function () {
            $ctrl.logginInSectionOpen = '';
        }

        var enableAcctLocked = function (){
            openAcctLocked();
            closeLoginForm();
            closeAcctLocked();
        }
        var enableLoginForm = function (){
            closeLoggingIn();
            closeAcctLocked();
            openLoginForm();
        }

        var loginFailed = function (){
            if ($ctrl.loginattempts > 2) enableAcctLocked();
            else enableLoginForm();
        }

        var attemptLogin = function (){
            $ctrl.loginattempts++;
            openLoggingIn();
            closeLoginForm();
            loginFailed();
        }

        $ctrl.loginFailed = loginFailed;

        $ctrl.attemptLogin = function (){
            attemptLogin();
        }


        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        }


    }
})();
