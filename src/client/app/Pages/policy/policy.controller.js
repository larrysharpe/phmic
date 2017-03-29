(function () {
    'use strict';

    angular
        .module('app.policy')
        .controller('PolicyController', PolicyController);

    PolicyController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location'];
    /* @ngInject */
    function PolicyController($q, dataservice, logger, $stateParams, $location) {

        var $ctrl = this;

        $ctrl.switchPages = function () {
            console.log($ctrl.selectedPolicy);
            var path = '/policy/' + $ctrl.selectedPolicy.id;
            $location.path(path);
        };

        $ctrl.showCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = true;
        };
        $ctrl.hideCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = false;
        };

        $ctrl.showSections = {
            'DriverInformation': false
        };

        $ctrl.displayFields = {
            'ClientInformation':[
                {name: 'name', displayName: 'Insured Name'},
                {name: 'address', displayName: 'Mailing Address'},
                {name: 'workPhone', displayName: 'Wok Phone'},
                {name: 'homePhone', displayName: 'Home Phone'},
                {name: 'cellPhone', displayName: 'Cell Phone'},
                {name: 'workEmail', displayName: 'Work Email'},
                {name: 'personalEmail', displayName: 'Personal Email'},
                {name: 'webAddress', displayName: 'Web Address'},
                {name: 'fax', displayName: 'Fax'}
            ],
            'DriverInformation':[
                {name: 'name', displayName: 'Driver Name'},
                {name: 'dob', displayName: 'Date of Birth'},
                {name: 'licenseNum', displayName: 'License Number'},
                {name: 'maritalStatus', displayName: 'Martial Status'},
                {name: 'goodStudent', displayName: 'Good Student'},
                {name: 'defensiveDriver', displayName: 'Defensive Driver'},
                {name: 'excludedDriver', displayName: 'Excluded Driver'},
                {name: 'driversTraining', displayName: 'Driver Training'}
            ],
            'PolicyInformation':[
                {name: 'policyNum', displayName: 'Policy Number'},
                {name: 'customerNum', displayName: 'Customer Number'},
                {name: 'contact', displayName: 'Contact Name'},
                {name: 'policyStatus', displayName: 'Policy Status'},
                {name: 'effDate', displayName: 'Effective Date'},
                {name: 'expDate', displayName: 'Expiration Date'},
                {name: 'twp', displayName: 'Total Written Premium'}
            ],
            'UnitInformation':[
                {name: 'year', displayName: 'Year'},
                {name: 'makeModel', displayName: 'Make/Model'},
                {name: 'vin', displayName: 'VIN'},
                {name: 'fullAddr', displayName: 'Garaging Location'},
                {name: 'premium', displayName: 'Premium'}
            ],
            'PolicyInterests':[
                {name: 'name', displayName: 'Name'},
                {name: 'address', displayName: 'Address'}
            ]
        };

        var showDriverInformationList = ['personal-auto'];

        var sectionList = {
            'DriverInformation':['personal-auto']
        };

        var handleGetClient = function (data) {
            $ctrl.client = data;
            return $ctrl.client;
        };

        /**
         * Call data service and get current client
         * @returns {*}
         */
        var getClient = function (userid) {
            return dataservice.getPerson(userid).then(handleGetClient);
        };

        /**
         * Handle the results returned from the data service
         * @param {Object} data
         * @returns {*}
         */
        var handleGetPolicy = function (data) {
            $ctrl.policy = data;
            getClient(data.userid);

            for (var section in sectionList) {
                if (sectionList[section].indexOf(data.Type) > -1) { $ctrl.showDriverInformation = true; }
            }

            return $ctrl.policy;
        };

        /**
         * Call the data service and get the current policy details
         * @returns {*}
         */
        var getPolicy = function () {
            return dataservice.getPolicy($stateParams.id).then(handleGetPolicy);
        };

        getPolicy();

    }
})();
