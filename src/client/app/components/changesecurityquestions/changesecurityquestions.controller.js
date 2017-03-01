(function () {
    'use strict';

    angular
        .module('app.changesecurityquestions')
        .controller('ChangeSecurityQuestionsController', ChangeSecurityQuestionsController);

    ChangeSecurityQuestionsController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location', '$uibModal'];
    /* @ngInject */
    function ChangeSecurityQuestionsController($q, dataservice, logger, $stateParams, $location, $uibModal) {
        var $ctrl = this;

        var signInAgainOptions = {
            controller: 'SignInAgainController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/signinagain/signinagain.html'
        };

        $uibModal.open(signInAgainOptions);

        var handleGetClient = function (data) {
            $ctrl.client = data;
            return $ctrl.client;
        };

    }
})();
