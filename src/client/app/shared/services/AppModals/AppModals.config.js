(function () {
    'use strict';
    var modalsPath = 'app/Components/Modals';
    var ModalConfig = {
        activateSMS: {
            controller: 'ActivateSMSController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/activatesms/activatesms.html'
        },
        billPay: {
            controller: 'BillpaymodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/billPay/billpaymodal.html'
        },

        forgotPassword: {
            controller: 'ForgotPasswordController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/ForgotPassword/ForgotPassword.html'
        },
        login: {
            controller: 'LoginModalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/login/loginmodal.html'
        },
        recoveryEmail: {
            controller: 'RecoveryEmailController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/recoveryemail/recoveryemail.html'
        },
        signInAgain: {
            controller: 'SignInAgainController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/signinagain/signinagain.html',
            backdrop: 'static',
            keyboard: false
        },
        signUp: {
            controller: 'AcctcreatemodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: modalsPath + '/acctCreate/acctcreatemodal.html'
        }
    };

    angular
        .module('app.modals.config',[])
        .value('ModalConfig', ModalConfig);
})();
