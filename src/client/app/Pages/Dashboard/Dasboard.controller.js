(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dataservice', 'Auth'];
    /* @ngInject */
    function DashboardController(dataservice, Auth) {
        var $ctrl = this;
    }
})();
