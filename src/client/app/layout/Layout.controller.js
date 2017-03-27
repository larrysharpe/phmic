(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$state', '$location', 'Auth', 'ModalService'];
    /* @ngInject */
    function ShellController($state, $location, Auth, ModalService) {
        var paybillPages = ['dashboard', 'policy'];
        var themeDark = ['dashboard', 'policy', 'profile', 'changepassword', 'changesecurityquestions',
            'accountsecurity', 'about-us'];

        var $ctrl = this;
        $ctrl.loggedIn = Auth.isLoggedIn;
        $ctrl.modals = ModalService;
        $ctrl.page = $state.current.name;
        $ctrl.themeclass = null;
        $ctrl.user = Auth.getUser;

        $ctrl.logout = Auth.logout;

        var setPageAndTheme = function () {
            $ctrl.page = $state.current.name;
            if (themeDark.indexOf($state.current.name) > -1) { $ctrl.themeclass = 'theme-dark'; }
            else { $ctrl.themeclass = null; }
        };

        $ctrl.showPayBill = function () {
            setPageAndTheme();
            return paybillPages.indexOf($state.current.name) > -1;
        };
    }
})();
