(function () {
    'use strict';

    angular
        .module('app.billpaymodal')
        .controller('BillpaymodalController', BillpaymodalController);

    BillpaymodalController.$inject = ['$uibModalInstance'];
    /* @ngInject */
    function BillpaymodalController($uibModalInstance) {
        var $ctrl  = this;
        $ctrl.view = 'billpay';

        $ctrl.isView = function (view) {
            return $ctrl.view === view;
        };

        $ctrl.closeModal = $uibModalInstance.close;

    }
})();
