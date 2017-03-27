(function () {
    'use strict';

    angular
        .module('app.modals', ['ui.bootstrap','app.modals.config'])
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$uibModal', '$uibModalStack', 'ModalConfig', '$templateCache'];
    /* @ngInject */
    function ModalService($uibModal, $uibModalStack, ModalConfig, $templateCache) {
        return {
            open: function (modalName) {
                $uibModalStack.dismissAll();
                $uibModal.open(ModalConfig[modalName]);
            }
        };
    }
})();
