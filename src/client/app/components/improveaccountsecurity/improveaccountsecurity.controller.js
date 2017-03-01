(function () {
    'use strict';

    angular
        .module('app.improveaccountsecurity')
        .controller('ImproveAccountSecurityController', ImproveAccountSecurityController);

    ImproveAccountSecurityController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location', '$uibModal'];
    /* @ngInject */
    function ImproveAccountSecurityController($q, dataservice, logger, $stateParams, $location, $uibModal) {
        var $ctrl = this;

        var modalOptions = {
            signInAgainOptions: {
                controller: 'SignInAgainController',
                controllerAs: '$ctrl',
                size: 'md',
                templateUrl: '/app/components/modals/signinagain/signinagain.html'
            },
            activatesms: {
                controller: 'ActivateSMSController',
                controllerAs: '$ctrl',
                size: 'md',
                templateUrl: '/app/components/modals/activatesms/activatesms.html'
            },
            recoveryemail: {
                controller: 'RecoveryEmailController',
                controllerAs: '$ctrl',
                size: 'md',
                templateUrl: '/app/components/modals/recoveryemail/recoveryemail.html'
            }
        };

        $uibModal.open(modalOptions.signInAgainOptions);

        $ctrl.SMSActive = false;
        $ctrl.recoveryEmailActive = false;
        $ctrl.openActiveSMS = function () {
            $uibModal.open(modalOptions.activatesms);
        };

        $ctrl.openRecoveryEmail = function () {
            $uibModal.open(modalOptions.recoveryemail);
        };

        var handleGetClient = function (data) {
            $ctrl.client = data;
            return $ctrl.client;
        };

    }
})();
