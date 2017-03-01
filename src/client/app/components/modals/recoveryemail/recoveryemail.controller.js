(function () {
    'use strict';

    angular
        .module('app.recoveryemail')
        .controller('RecoveryEmailController', RecoveryEmailController);

    RecoveryEmailController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal', '$scope', '$location', 'Auth'];
    /* @ngInject */
    function RecoveryEmailController($q, dataservice, logger, $uibModalInstance, $uibModal, $scope, $location, Auth) {
        var $ctrl  = this;


        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        };


    }
})();
