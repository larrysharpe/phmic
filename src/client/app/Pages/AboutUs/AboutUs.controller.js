(function () {
    'use strict';

    angular
        .module('app.aboutus')
        .controller('AboutUsController', AboutUsController);

    function AboutUsController() {
        var $ctrl = this;
        $ctrl.acct = {};

    }
})();
