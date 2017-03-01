(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', '$uibModal'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger, $uibModal) {

        var $ctrl = this;
        var billPayModalOptions = {
            controller: 'BillpaymodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/billPay/billpaymodal.html'
        };

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * Opens the Bill Pay Modal
         */
        $ctrl.openBillPay = function () {
            $uibModal.open(billPayModalOptions);
        };

        /**
         * Handle the results returned from the data service
         * @param data
         * @returns {*}
         */
        var handleGetData = function (data){
            $ctrl.client = data;
            return $ctrl.client;
        };

        /**
         * Call data service and get current client
         * @returns {*}
         */
        var getData = function () {
            return dataservice.getPerson(getRandomIntInclusive(1,100)).then(handleGetData);
        };

        getData();
    }
})();
