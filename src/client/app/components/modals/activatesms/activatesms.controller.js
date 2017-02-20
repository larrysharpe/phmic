(function () {
    'use strict';

    angular
        .module('app.activatesms')
        .controller('ActivateSMSController', ActivateSMSController);

    ActivateSMSController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal', '$scope', '$location', 'Auth'];
    /* @ngInject */
    function ActivateSMSController($q, dataservice, logger, $uibModalInstance, $uibModal, $scope, $location, Auth) {
        var $ctrl  = this;

        var modalOptions = {
            controller: 'AcctcreatemodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/acctCreate/acctcreatemodal.html'
        };

        $ctrl.setupAcct = function () {
            $uibModalInstance.close();
            $uibModal.open(acctCreateModalOptions);
        }

        var runScope = function () {
            if(!$scope.$$phase) $scope.$apply();
        }

        var openLoginForm = function () {
            $ctrl.view = 'login';
            runScope();
        }
        var openAcctLocked = function () {
            $ctrl.view = 'locked';
            runScope();
        }
        var openLoggingIn = function () {
            $ctrl.view = 'loggingIn';
            runScope();
        }

        var enableAcctLocked = function (){
            openAcctLocked();
        }
        var enableLoginForm = function (){
            openLoginForm();
        }

        var loginFailed = function ($error){
            if ($ctrl.loginattempts > 2) enableAcctLocked();
            else enableLoginForm();
        }

        var loginSuccess = function (){
            $ctrl.closeModal();
            $location.path('/dashboard');
        }

        var attemptLogin = function () {

            $ctrl.loginattempts++;
            openLoggingIn();

            if($ctrl.login && $ctrl.login.email && $ctrl.login.password) {
                Auth.login($ctrl.user);
                $ctrl.user = {
                    email: 'yoyoyo',
                    password: 'fdasd'
                };
            }
            /*
            return dataservice.getLogin($ctrl.user).then(function (data) {
                //$ctrl.res = data;

                if(data.status === 'error') loginFailed(data);
                else if (data.status === 'success') loginSuccess();

                return data;
            });
            */
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
