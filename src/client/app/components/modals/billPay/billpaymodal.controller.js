(function () {
    'use strict';

    angular
        .module('app.billpaymodal')
        .controller('BillpaymodalController', BillpaymodalController);

    BillpaymodalController.$inject = ['$q', 'dataservice', 'logger', '$uibModalInstance'];
    /* @ngInject */
    function BillpaymodalController($q, dataservice, logger, $uibModalInstance) {
        var $ctrl  = this;

        $ctrl.view = 'billpay';

        $ctrl.isView = function (view) {
            return $ctrl.view === view;
        }

        $ctrl.closeModal = function () {
            $uibModalInstance.close();
        }

    }
})();
