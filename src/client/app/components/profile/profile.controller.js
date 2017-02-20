(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$location'];
    /* @ngInject */
    function ProfileController($q, dataservice, logger, $stateParams, $location) {
        var $ctrl = this;

        var handleGetClient = function (data){
            $ctrl.client = data;
            return $ctrl.client;
        }

    }
})();
