/**
 * Inject all the spec files into the specs.html
 * @return {Stream}
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log     = require('./util/log');
    var inject  = require('./util/inject')(gulp, plugins);

    return function () {
        log('building the spec runner');

        var wiredep = require('wiredep').stream;
        var templateCache = config.path.temp + config.path.templateCache.file;
        var options = config.getWiredepDefaultOptions();
        var specs = config.path.specs;

        if (args.startServers) {
            specs = [].concat(specs, config.serverIntegrationSpecs);
        }
        options.devDependencies = true;

        return gulp
            .src(config.path.specRunner)
            .pipe(wiredep(options))
            .pipe(inject(config.path.js, '', config.path.jsOrder))
            .pipe(inject(config.path.testlibraries, 'testlibraries'))
            .pipe(inject(config.path.specHelpers, 'spechelpers'))
            .pipe(inject(specs, 'specs', ['**/*']))
            .pipe(inject(templateCache, 'templates'))
            .pipe(gulp.dest(config.path.client));

    };
};
