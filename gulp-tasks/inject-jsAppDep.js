/**
 * Wire-up the js app dependencies
 */
module.exports = function (gulp, plugins, config, args, browserSync) {
    'use strict';

    var log = require('./util/log');
    var inject = require('./util/inject')(gulp, plugins);

    return function () {
        log('Wiring the js app dependencies into the html');

        // Only include stubs if flag is enabled
        var js = args.mocks ? [].concat(config.path.js, config.path.mocksjs) : config.path.js;

        var myPipe = gulp
                .src(config.path.index)
                .pipe(inject(js, '', config.path.jsOrder))
                .pipe(gulp.dest(config.path.client));

        if (typeof browserSync !== 'undefined') {
            myPipe.on('end', browserSync.reload);
        }

        return myPipe;
    };
};
