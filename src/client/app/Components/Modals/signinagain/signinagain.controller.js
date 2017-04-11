(function () {
    'use strict';

    angular
        .module('app.signinagain')
        .controller('SignInAgainController', SignInAgainController);

    SignInAgainController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal', '$scope', '$location', 'Auth'];
    /* @ngInject */
    function SignInAgainController($q, dataservice, logger, $uibModalInstance, $uibModal, $scope, $location, Auth) {
        var $ctrl  = this;

        $ctrl.loginattempts = 0;

        $ctrl.toolTipEmail = 'We do not recognize that email address. Check your spelling or click below if you need help.';
        $ctrl.toolTipPassword = 'That password is incorrect. Try again or click below for assistance.';

        $ctrl.user = {};
        $ctrl.login = {};
        //todo: remove test data
        $ctrl.login = {
            email: 'edunn0@yellowbook.com',
            password: 'anVIqH7X'
        };

        var loginSuccess = function () {
            $ctrl.closeModal();
            $location.path('/dashboard');
        };

        $ctrl.attemptLogin = function () {
            $ctrl.loginattempts++;

            Auth.login($ctrl.login).then(function(res) {
                $ctrl.closeModal();
            }).catch(function(err) {
                console.log('ERROR: ', err);
            });
        };

        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        };

    }
})();
