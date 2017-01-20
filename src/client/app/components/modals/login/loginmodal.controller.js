(function () {
    'use strict';

    angular
        .module('app.loginmodal')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal', '$scope'];
    /* @ngInject */
    function LoginModalController($q, dataservice, logger, $uibModalInstance, $uibModal, $scope) {
        var $ctrl  = this;

        $ctrl.loginattempts = 0;

        $ctrl.view = 'login';   //[login, loggingIn, locked]

        $ctrl.retryValue = 60;
        $ctrl.retryTarget = 0;

        $ctrl.toolTipEmail = 'We do not recognize that email address. Check your spelling or click below if you need help.';
        $ctrl.toolTipPassword = 'That password is incorrect. Try again or click below for assistance.';


        var acctCreateModalOptions = {
            controller: 'AcctcreatemodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/acctCreate/acctcreatemodal.html'
        };

        $ctrl.setupAcct = function () {
            $uibModalInstance.close();
            $uibModal.open(acctCreateModalOptions);
        }

        var openLoginForm = function () {
            $ctrl.view = 'login';
            $scope.$apply();
        }
        var openAcctLocked = function () {
            $ctrl.view = 'locked';
        }
        var openLoggingIn = function () {
            $ctrl.view = 'loggingIn';
        }

        var enableAcctLocked = function (){
            openAcctLocked();
        }
        var enableLoginForm = function (){
            openLoginForm();
        }

        var loginFailed = function (){
            if ($ctrl.loginattempts > 2) enableAcctLocked();
            else enableLoginForm();
        }



        var attemptLogin = function () {

            $ctrl.loginattempts++;
            openLoggingIn();
            return dataservice.getLogin().then(function (data) {
                $ctrl.res = data;
                return data;
            });
            setTimeout(loginFailed, 1000);
        }

        $ctrl.loginFailed = loginFailed;

        $ctrl.attemptLogin = function (){
            attemptLogin();
        }

        $ctrl.isView = function (view) {
            return $ctrl.view === view;
        }


        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        }


    }
})();
