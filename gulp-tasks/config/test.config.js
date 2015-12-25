module.exports = function(config) {
    'use strict';

    var wiredep = require('wiredep');
    var options = config.getWiredepDefaultOptions();
    options.devDependencies = true;
    var bowerFiles = wiredep(options)['js'];

    var path = config.path;

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.path.specHelpers,
                path.app + '**/*.module.js',
                path.app + '**/*.js',
                path.temp + path.templateCache.file
            ),
            exclude: [],
            coverage: {
                dir: path.report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[path.app + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
