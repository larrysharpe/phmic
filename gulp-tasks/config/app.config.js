module.exports = function(config) {
    'use strict';

    config.app = {
        package: 'es.silentdrop.platform',
        name: 'silentdrop-platform',
        description: 'Silent drop platform',
        version: '1.0.0',
        defaultPort: '8001'
    };

    return config;
};
