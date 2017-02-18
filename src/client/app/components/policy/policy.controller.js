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
        /*policies: [
            {name: 'Businessowners Policy', num: 'BOP 3241253 14', summary: lorem, id: 123456 },
            {name: 'Commercial Auto Policy', num: 'CAU 1212332 14', summary: lorem, id: 234567 },
            {name: 'Personal Auto Policy', num: 'APV 00033249 00', summary: lorem, id: 345678 },
        ],:*/
        policies: {
            '345678': {
                name: 'Personal Auto',
                num: 'APV 00033249 00',
                summary: lorem,
                id: 345678,
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
                        ],
                        desc: lorem.substr(0, 100)
                    },
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
                        ],
                        desc: lorem.substr(0, 100)
                    }
                ]
            }
        }
};

    angular
        .module('app.policy')
        .value('PolicyLocalData', LocalData)
        .controller('PolicyController', PolicyController);

    PolicyController.$inject = ['$q', 'dataservice', 'logger', 'PolicyLocalData'];
    /* @ngInject */
    function PolicyController($q, dataservice, logger, PolicyLocalData) {

        var lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.';

        var $ctrl = this;


        //replace with data service

        $ctrl.driverTableHeaders = [
            {name: 'unit', displayName: 'Unit'},
            {name: 'name', displayName: 'Name'},
            {name: 'dob', displayName: 'DOB'},
            {name: 'isGoodStudent', displayName: 'Good Student'},
            {name: 'isDefensiveDriver', displayName: 'Defensive Driver'},
            {name: 'isExcludedDriver', displayName: 'Excluded Driver'},
            {name: 'hasDriverTraining', displayName: 'Driver Training'}
        ]

        $ctrl.showCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = true;
        }
        $ctrl.hideCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = false;
        }

        $ctrl.policy = LocalData.policy;
    }
})();
