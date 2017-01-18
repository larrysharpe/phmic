(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {

        var lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.';

        var $ctrl = this;


        //replace with data service
        $ctrl.user = {
          fname: 'Larry'
        };
        $ctrl.policies = [
            {name: 'Professional Liability', num: 9998451, summary: lorem },
            {name: 'Commercial Auto', num: 1234567, summary: lorem },
            {name: 'Homeowners', num: 7654321, summary: lorem },
            {name: 'Personal Auto', num: 4567890, summary: lorem },
            {name: 'Personal Umbrella', num: 1987654, summary: lorem },
            {name: 'Workers Compensation', num: 4354467, summary: lorem }
        ];
    }
})();
