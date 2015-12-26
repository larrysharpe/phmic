/**
 * Wire-up the bower dependencies
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');

    return function () {
        log('Wiring the bower dependencies and customJS into the html');

        var wiredep = require('wiredep').stream;
        var options = config.getWiredepDefaultOptions();
        var inject = require('./util/inject')(gulp, plugins);

        return gulp
            .src(config.path.index)
            .pipe(wiredep(options))
            .pipe(plugins.inject(gulp.src([].concat(config.path.customjs, '!**/modernizr-custom.js'), {read: false}), {name: 'customjs'}))
            .pipe(plugins.if(args.verbose, plugins.print()))
            .pipe(gulp.dest(config.path.client));
    };
};
