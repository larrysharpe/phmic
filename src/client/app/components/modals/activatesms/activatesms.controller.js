(function () {
    'use strict';

    angular
        .module('app.activatesms')
        .controller('ActivateSMSController', ActivateSMSController);

    ActivateSMSController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance', '$uibModal', '$scope', '$location', 'Auth'];
    /* @ngInject */
    function ActivateSMSController($q, dataservice, logger, $uibModalInstance, $uibModal, $scope, $location, Auth) {
        var $ctrl  = this;


        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        }


    }
})();
