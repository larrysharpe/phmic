/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('DataUrls', {
            'GET_CLIENT': '/api/clients/',
            'GET_CLIENTS': '/api/clients/',
            'GET_POLICIES': '/api/policy/',
            'GET_USER': '/api/user/info',
            'POST_LOGIN': '/api/auth',
            'POST_CREATEACCESSCODE': '/api/unauth/validate',
            'POST_CREATEACCESSPOINT': '/api/unauth/access',
            'POST_CREATEUSERACCOUNT': '/api/unauth/user',
            'POST_RESENDACCESSCODE': '/api/unauth/resend',
            'POST_RESETPASSWORD': '/api/unauth/resetpassword',
            'POST_REQUESTRESETPASSWORD': '/api/unauth/resetpassword',
            'POST_RESETPASSWORDTOKEN': '/api/unauth/resetpassword'
        });
})();
