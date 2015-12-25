module.exports = function(config) {
    'use strict';

    config.dist = {};

    config.dist.ensure = {
        environment: function (env, debugmode) {
            if (debugmode) {return 'dev';}

            if (env !== null && env !== undefined) {return env.toLowerCase();}
            else {return 'dev';}
        },
        services : function(svc, env) {
            var servicesEnvironment = env;
            if (svc) {
                servicesEnvironment = svc.toLowerCase();
            }
            return servicesEnvironment;
        }
    };

    config.dist.testfairy = {
        api_key: 'abc123456789',
        video: '',
        'auto-update': 'on'
    };

    config.dist.slack = {
        token: 'abc123456789'
    };

    return config;
};
