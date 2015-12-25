module.exports = function(config) {
    'use strict';

    config.environment = {
        production: {
            privateApi:'',
            publicApi:'',
            auth:'',
            authRefresh:''
        },
        preproduction: {
            privateApi:'',
            publicApi:'',
            auth:'',
            authRefresh:''
        },
        development: {
            privateApi:'',
            publicApi:'',
            auth:'',
            authRefresh:''
        }
    };

    return config;
};
