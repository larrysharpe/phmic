(function () {
    'use strict';

    angular
        .module('app.activatesms')
        .controller('ActivateSMSController', ActivateSMSController);

    ActivateSMSController.$inject = ['$uibModalInstance'];
    /* @ngInject */
    function ActivateSMSController($uibModalInstance) {
        var $ctrl  = this;
        $ctrl.closeModal = $uibModalInstance.close;
    }
})();
