(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$uibModal', '$state', '$location'];
    /* @ngInject */
    function ShellController($uibModal, $state, $location){
        var $ctrl = this;
        $ctrl.page = $state.current.name;
        $ctrl.themeclass = null;
        $ctrl.loggedin  = false;

        $ctrl.login = function (){
            $ctrl.loggedin  = true;
            $location.path('/dashboard');
        };
        $ctrl.logout = function (){
            $ctrl.loggedin  = false;
            $location.path('/');
        };

        var themeDark = ['dashboard', 'policy', 'profile', 'changepassword', 'changesecurityquestions', 'improveaccountsecurity'];

        var setPageAndTheme = function (){
            $ctrl.page = $state.current.name;
            if (themeDark.indexOf($state.current.name) > -1) { $ctrl.themeclass = 'theme-dark'; }
            else { $ctrl.themeclass = null; }
        };

        var paybillPages = ['dashboard', 'policy'];
        $ctrl.showPayBill = function (){
            setPageAndTheme();
            return paybillPages.indexOf($state.current.name) > -1;
        };

        var loginModalOptions = {
            controller: 'LoginModalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/login/loginmodal.html'
        };

        var billPayModalOptions = {
            controller: 'BillpaymodalController',
            controllerAs: '$ctrl',
            size: 'md',
            templateUrl: '/app/components/modals/billPay/billpaymodal.html'
        };


        /**
         * Opens the Login Modal
         */
        $ctrl.openLoginModal = function (){
            $uibModal.open(loginModalOptions);
        };

        /**
         * Opens the Bill Pay Modal
         */
        $ctrl.openBillPay = function () {
            $uibModal.open(billPayModalOptions);
        };
    }

})();
