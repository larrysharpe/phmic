(function () {
    'use strict';

    //todo: remove test data
    var testData = {
        email: 'edunn0@yellowbook.com',
        password: 'anVIqH7X'
    };

    angular
        .module('app.loginmodal')
        .value('LoginModalTestData', testData)
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$uibModalInstance', 'ModalService', '$scope', '$location', 'Auth', 'LoginModalTestData'];
    /* @ngInject */
    function LoginModalController($uibModalInstance, ModalService, $scope, $location, Auth, LoginModalTestData) {
        var $ctrl  = this;
        $ctrl.login = {};
        $ctrl.loginattempts = 0;
        $ctrl.modals = ModalService;
        $ctrl.retryValue = 60;
        $ctrl.retryTarget = 0;
        $ctrl.toolTipEmail = 'We do not recognize that email address. Check your spelling or click below if you need help.';
        $ctrl.toolTipPassword = 'That password is incorrect. Try again or click below for assistance.';
        $ctrl.view = 'login';   //[login, loggingIn, locked]

        $ctrl.login = LoginModalTestData; //todo: remove test data

        var openLoginForm = function () {
            $ctrl.view = 'login';
        };
        var openAcctLocked = function () {
            $ctrl.view = 'locked';
        };
        var openLoggingIn = function () {
            $ctrl.view = 'loggingIn';
        };

        var loginFailed = function ($error) {
            if ($ctrl.loginattempts > 2) { openAcctLocked(); }
            else { openLoginForm(); }
        };

        var loginSuccess = function () {
            $ctrl.closeModal();
            $location.path('/dashboard');
        };

        $ctrl.loginFailed = loginFailed;

        $ctrl.attemptLogin = function () {
            $ctrl.loginattempts++;
            openLoggingIn();

            Auth.login($ctrl.login).then(loginSuccess).catch(loginFailed);
        };

        $ctrl.isView = function (view) {
            return $ctrl.view === view;
        };

        $ctrl.closeModal = $uibModalInstance.close;
    }
})();
