(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'appConfig', 'logger', '$uibModal'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, appConfig, logger, $uibModal) {
        var $ctrl = this;
        var loginModalOptions = {
            controller: 'LoginModalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/login/loginmodal.html'
        };

        $ctrl.openLoginModal = function (){
            $uibModal.open(loginModalOptions);
        }

    }

})();
