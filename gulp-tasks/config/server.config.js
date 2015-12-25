module.exports = function(config) {
    'use strict';

    var server = './src/server/';

    config.server = {
        nodeServer: server + 'app.js',
        defaultPort: '8001',
        browserReloadDelay: 1000
    };

    return config;

};
