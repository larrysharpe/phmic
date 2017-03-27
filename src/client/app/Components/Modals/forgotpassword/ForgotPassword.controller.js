(function () {
    'use strict';

    angular
        .module('app.forgotpassword')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$uibModalInstance', 'dataservice', 'ModalService'];
    /* @ngInject */
    function ForgotPasswordController ($uibModalInstance, dataservice, ModalService) {
        var $ctrl  = this;
        $ctrl.view = 'step1';
        $ctrl.modals = ModalService;

        $ctrl.login = {
            email: 'edunn0@yellowbook.com'
        };

        $ctrl.resetPassword = function () {
            $ctrl.view = 'step4';
        };

        $ctrl.requestPasswordReset = function() {
            console.log($ctrl.login.email);
            dataservice.requestPasswordReset($ctrl.login.email)
            .then(function (res) {
                console.log(res);
                $ctrl.view = 'step2';
            })
            .catch(function (res) {
                console.log('error', res);
            });
        };

        $ctrl.resetPasswordToken = function() {
            console.log($ctrl.login.email);
            dataservice.passwordResetToken($ctrl.login.email)
            .then(function (res) {
                console.log('Step 3',res);
                $ctrl.view = 'step3';
            })
            .catch(function (res) {
                console.log('error', res);
            });
        };

        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        };

    }
})();
