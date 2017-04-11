(function () {
    'use strict';

    //todo: remove test data
    var testData = {
        accesscode: 'asfadgrtartartatvt',
        customerno: 123354,
        email: 'kblack6@washingtonpost.com',
        password: 'eefwwewfwA1',
        confirmpassword: 'eefwwewfwA1',
        securityquestions: [
            {question: 'What was your childhood nickname1?', answer: 'wefwfewfef'},
            {question: 'What was your childhood nickname2?', answer: 'ewfwefwf'},
            {question: 'What was your childhood nickname3?', answer: 'wefwefwfefe'}
        ]
    };

    angular
        .module('app.changesecurityquestions')
        .value('ChangeSecurityQuestionsControllerTestData', testData)
        .controller('ChangeSecurityQuestionsController', ChangeSecurityQuestionsController);
    ChangeSecurityQuestionsController.$inject = ['ModalService','ChangeSecurityQuestionsControllerTestData'];
    /* @ngInject */
    function ChangeSecurityQuestionsController(ModalService, testdata) {
        var $ctrl = this;
        $ctrl.acct = testdata;
        ModalService.open('signInAgain');
    }
})();
