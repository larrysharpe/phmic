(function () {
    'use strict';

    angular
        .module('app.policy')
        .controller('PolicyController', PolicyController);

    PolicyController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location'];
    /* @ngInject */
    function PolicyController($q, dataservice, logger, $stateParams, $location) {

        var $ctrl = this;

        $ctrl.switchPages = function (){
            console.log($ctrl.selectedPolicy);
            var path = '/policy/' + $ctrl.selectedPolicy.id;
            $location.path(path);
        }

        $ctrl.showCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = true;
        }
        $ctrl.hideCoverage = function (i) {
            $ctrl.policy.vehicles[i].showCoverage = false;
        }

        $ctrl.showSections = {
            "DriverInformation": false
        };

        $ctrl.displayFields = {
          "ClientInformation": [
              {name: "Name", displayName: "Insured Name"},
              {name: "Address", displayName: "Mailing Address"},
              {name: "WorkPhone", displayName: "Wok Phone"},
              {name: "HomePhone", displayName: "Home Phone"},
              {name: "CellPhone", displayName: "Cell Phone"},
              {name: "WorkEmail", displayName: "Work Email"},
              {name: "PersonalEmail", displayName: "Personal Email"},
              {name: "WebAddress", displayName: "Web Address"},
              {name: "Fax", displayName: "Fax"}
          ],
          "DriverInformation": [
              {name: 'Name', displayName: 'Driver Name'},
              {name: 'DOB', displayName: 'Date of Birth'},
              {name: 'LicenseNum', displayName: 'License Number'},
              {name: 'MaritalStatus', displayName: 'Martial Status'},
              {name: 'GoodStudent', displayName: 'Good Student'},
              {name: 'DefensiveDriver', displayName: 'Defensive Driver'},
              {name: 'ExcludedDriver', displayName: 'Excluded Driver'},
              {name: 'DriversTraining', displayName: 'Driver Training'}
          ],
          "PolicyInformation": [
                {name: "PolicyNum", displayName: "Policy Number"},
                {name: "CustomerNum", displayName: "Customer Number" },
                {name: "Contact", displayName: "Contact Name"},
                {name: "PolicyStatus", displayName: "Policy Status"},
                {name: "EffDate", displayName: "Effective Date"},
                {name: "ExpDate", displayName: "Expiration Date"},
                {name: "TWP", displayName: "Total Written Premium"}
          ],
          "UnitInformation": [
              {name: "Year", displayName: "Year"},
              {name: "MakeModel", displayName: "Make/Model" },
              {name: "VIN", displayName: "VIN"},
              {name: "FullAddr", displayName: "Garaging Location"},
              {name: "Premium", displayName: "Premium"},
          ],
          "PolicyInterests": [
              {name: "Name", displayName: "Name"},
              {name: "Address", displayName: "Address" }
          ]
        };


        var showDriverInformationList = ['personal-auto'];

        var sectionList = {
            "DriverInformation": ['personal-auto']
        };

        /**
         * Handle the results returned from the data service
         * @param data
         * @returns {*}
         */
        var handleGetPolicy = function (data){
            $ctrl.policy = data;
            getClient(data.userid);

            for (var section in sectionList){
                if (sectionList[section].indexOf(data.Type) > -1) $ctrl.showDriverInformation = true;
            }

            return $ctrl.policy;
        }

        var handleGetClient = function (data){
            $ctrl.client = data;
            return $ctrl.client;
        }


        /**
         * Call the data service and get the current policy details
         * @returns {*}
         */
        var getPolicy = function () {
            return dataservice.getPolicy($stateParams.id).then(handleGetPolicy);
        }

        /**
         * Call data service and get current client
         * @returns {*}
         */
        var getClient = function (userid) {
            return dataservice.getPerson(userid).then(handleGetClient);
        }

        getPolicy();

    }
})();
