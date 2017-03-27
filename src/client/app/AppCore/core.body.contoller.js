(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('BodyController', BodyController);

    BodyController.$inject =  ['$state'];

    function BodyController ($state) {
        var $ctrl = this;
        $ctrl.hello = 'world';
        $ctrl.state = $state.current;
    }
})();
