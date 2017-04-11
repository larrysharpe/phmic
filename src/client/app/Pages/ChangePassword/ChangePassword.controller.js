(function () {
    'use strict';

    angular
        .module('app.changepassword')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['ModalService'];
    /* @ngInject */
    function ChangePasswordController(ModalService) {
        var $ctrl = this;
        $ctrl.acct = {};
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

        ModalService.open('signInAgain');

        $ctrl.showConfirm = function () {
            return (!$ctrl.checkForWords() && !$ctrl.hasRepeatedLetters() && $ctrl.checkForNumber() &&
            $ctrl.checkForLowercase() && $ctrl.checkForUppercase() && $ctrl.checkPasswordLength());
        };

    }
})();
