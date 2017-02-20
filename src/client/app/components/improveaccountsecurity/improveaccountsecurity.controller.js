(function () {
    'use strict';

    angular
        .module('app.improveaccountsecurity')
        .controller('ImproveAccountSecurityController', ImproveAccountSecurityController);

    ImproveAccountSecurityController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location', '$uibModal'];
    /* @ngInject */
    function ImproveAccountSecurityController($q, dataservice, logger, $stateParams, $location, $uibModal) {
        var $ctrl = this;

        var signInAgainOptions = {
            controller: 'SignInAgainController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/signinagain/signinagain.html'
        };

        $uibModal.open(signInAgainOptions);

        var handleGetClient = function (data){
            $ctrl.client = data;
            return $ctrl.client;
        }

    }
})();
