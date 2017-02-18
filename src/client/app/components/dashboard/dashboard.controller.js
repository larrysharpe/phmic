(function () {
    'use strict';

    var lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.';
    var LocalData = {
        client: {
            address: '2113 Ash Street',
            city: 'Glenwood',
            name: 'John Smith',
            state: 'MA',
            zip: '46732'
        },
        policies: [
            {name: 'Businessowners Policy', num: 'BOP 3241253 14', summary: lorem, id: 123456 },
            {name: 'Commercial Auto Policy', num: 'CAU 1212332 14', summary: lorem, id: 123456 },
            {name: 'Personal Auto Policy', num: 'APV 00033249 00', summary: lorem, id: 123456 },
        ]
    };

    angular
        .module('app.dashboard')
        .value('DashboardLocalData', LocalData)
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', '$uibModal', 'DashboardLocalData'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger, $uibModal, DashboardLocalData) {

        var $ctrl = this;
        var billPayModalOptions = {
            controller: 'BillpaymodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/billPay/billpaymodal.html'
        };

        $ctrl.openBillPay = function () {
            $uibModal.open(billPayModalOptions);
        }

        function getClient() {
            return dataservice.getPerson(1).then(function (data) {
                $ctrl.people = data;

                console.log(data);

                return $ctrl.people;
            });
        }

        getClient();
        $ctrl.policies = LocalData.policies;
    }
})();
