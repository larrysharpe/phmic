(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function HomeController($q, dataservice, logger) {
        var vm  = this;

        vm.news = {
            title      : 'silentDrop',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };

        vm.messageCount = 0;
        vm.people       = [];
        vm.title        = 'Home';

        activate();

        function activate() {
            var promises = [getMessageCount()];
            return $q.all(promises).then(function () {
                logger.info('Activated Home View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

    }
})();
