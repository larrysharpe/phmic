(function () {
    'use strict';

    angular
        .module('app.loginmodal')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal'];
    /* @ngInject */
    function LoginModalController($q, dataservice, logger, $uibModalInstance, $uibModal) {
        var $ctrl  = this;

        $ctrl.loginattempts = 0;
        $ctrl.loginFormSection = 'open';
        $ctrl.acctLockedSectionOpen = '';
        $ctrl.logginInSectionOpen = '';

        $ctrl.retryValue = 60;
        $ctrl.retryTarget = 0;

        $ctrl.toolTipEmail = 'We do not recognize that email address. Check your spelling or click below if you need help.';
        $ctrl.toolTipPassword = 'That password is incorrect. Try again or click below for assistance.';


        var acctCreateModalOptions = {
            controller: 'AcctcreatemodalController',
            controllerAs: '$ctrl',
            size: 'sm',
            templateUrl: '/app/components/modals/acctCreate/acctcreatemodal.html'
        };
        $ctrl.setupAcct = function () {
            $uibModal.open(acctCreateModalOptions);
        }

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
