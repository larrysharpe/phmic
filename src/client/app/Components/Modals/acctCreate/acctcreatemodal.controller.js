(function () {
    'use strict';

    angular
        .module('app.acctcreatemodal')
        .controller('AcctcreatemodalController', AcctcreatemodalController);

    AcctcreatemodalController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$location', 'Auth'];
    /* @ngInject */
    function AcctcreatemodalController($q, dataservice, logger, $uibModalInstance, $location, Auth) {
        var $ctrl  = this;

        $ctrl.currentStep = 1;
        $ctrl.totalSteps = 4;
        $ctrl.fillWidth = 0;
        $ctrl.showStepControls = true;
        $ctrl.showCancelConfirmation = false;
        $ctrl.acct = {};

        $ctrl.showNextStep = function () {
            return $ctrl.currentStep < ($ctrl.totalSteps - 1);
        };
        $ctrl.showLastStep = function () {
            return $ctrl.currentStep === ($ctrl.totalSteps - 1);
        };
        $ctrl.showComplete = function () {
            return $ctrl.currentStep === $ctrl.totalSteps;
        };

        var continueSteps = function () {
            $ctrl.currentStep++;
            $ctrl.fillWidth =  (($ctrl.currentStep - 1) / $ctrl.totalSteps) * 100;
        };

        var continuationFunctions = {
            step1: function () {
                dataservice
                    .createAccessCode($ctrl.acct.email, $ctrl.acct.customerno)
                    .then(function(res) {
                        if (res.data === 'ok') {
                            continueSteps();
                        }
                    });
            },
            step2: function () {
                dataservice
                    .createAccessPoint($ctrl.acct.email, $ctrl.acct.customerno, $ctrl.acct.accesscode)
                    .then(function(res) {
                        if (res.data === 'ok') {
                            continueSteps();
                        }
                    });
            },
            step3: function () {
                continueSteps();
            },
            step4: function () {
                dataservice
                    .createUserAccount($ctrl.acct)
                    .then(function(res) {
                        continueSteps();
                        Auth.processLogin(res.data.user, res.data.token);
                        $ctrl.closeModal();
                        $location.path('/dashboard');
                    })
                    .catch(function(e) {
                        console.log(e);
                    })
                ;
            }
        };

        $ctrl.resendAccessCode = function () {
            dataservice.resendAccessCode($ctrl.acct.email, $ctrl.acct.customerno);
        };

        $ctrl.nextStep = function () {
            continuationFunctions['step' + $ctrl.currentStep]();
        };

        var showCancelConfirmation = function () {
            $ctrl.showStepControls = false;
            $ctrl.showCancelConfirmation = true;
        };

        $ctrl.cancelCreation = function () {
            if ($ctrl.currentStep === 1) { $ctrl.closeModal(); }
            else { showCancelConfirmation(); }
        };

        $ctrl.closeConfirmation = function () {
            $ctrl.showStepControls = true;
            $ctrl.showCancelConfirmation = false;
        };

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

        $ctrl.showConfirm = function () {
            return (!$ctrl.checkForWords() && !$ctrl.hasRepeatedLetters() && $ctrl.checkForNumber() &&
            $ctrl.checkForLowercase() && $ctrl.checkForUppercase() && $ctrl.checkPasswordLength());
        };

        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        };

    }
})();
