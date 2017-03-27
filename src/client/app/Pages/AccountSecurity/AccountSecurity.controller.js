(function () {
    'use strict';

    angular
        .module('app.improveaccountsecurity')
        .controller('AccountSecurityController', AccountSecurityController);

    AccountSecurityController.$inject = ['ModalService'];
    /* @ngInject */
    function AccountSecurityController(ModalService) {
        var $ctrl = this;
        $ctrl.modals = ModalService;
        $ctrl.SMSActive = false;
        $ctrl.recoveryEmailActive = false;

        ModalService.open('signInAgain');
    }
})();
