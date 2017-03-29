(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['Auth'];
    /* @ngInject */
    function DashboardController(Auth) {
        var $ctrl = this;
        $ctrl.getCurrentUser = Auth.getCurrentUser;
    }
})();
