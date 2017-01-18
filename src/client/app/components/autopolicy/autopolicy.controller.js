(function () {
    'use strict';

    angular
        .module('app.autopolicy')
        .controller('AutopolicyController', AutopolicyController);

    AutopolicyController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function AutopolicyController($q, dataservice, logger) {

        var lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.';

        var $ctrl = this;


        //replace with data service
        $ctrl.user = {
          fname: 'Larry'
        };
        $ctrl.policy = {
            name: 'Personal Auto',
            num: 4567890,
            summary: lorem,
            drivers: [
                {
                    unit: '0001',
                    name: 'John Smith',
                    dob: '12/09/1974',
                    isGoodStudent: false,
                    isDefensiveDriver: false,
                    isExcludedDriver: false,
                    hasDriverTraining: false
                },
                {
                    unit: '0002',
                    name: 'Alicia Smith',
                    dob: '04/20/1977',
                    isGoodStudent: false,
                    isDefensiveDriver: false,
                    isExcludedDriver: false,
                    hasDriverTraining: false
                },
                {
                    unit: '0003',
                    name: 'John Smith Jr',
                    dob: '10/17/2000',
                    isGoodStudent: true,
                    isDefensiveDriver: false,
                    isExcludedDriver: false,
                    hasDriverTraining: true
                },
            ],
            vehicles: [
                {
                    id: 182143242359,
                    coverages: [
                        {
                            name: 'Bodily Injury',
                            limit: '$100000/300000',
                            deductible: 1000
                        },
                        {
                            name: 'Collision',
                            deductible: 500
                        },
                        {
                            name: 'Full Glass',
                            deductible: 50
                        },
                        {
                            name: 'Other than Collision',
                            deductible: 50
                        },
                        {
                            name: 'Personal Injury Protection',
                            deductible: 0
                        },
                        {
                            name: 'Property Damage',
                            limit: '$100000',
                            deductible: 0
                        }
                    ]
                }
            ]
        };
    }
})();
