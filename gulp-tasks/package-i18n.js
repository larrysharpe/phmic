/**
 * Copy fonts
 */
module.exports = function (gulp, plugins, config, args, onSharedModule, configShared, browserSync) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying locals...');

        var myPipe = gulp
            .src(config.path.i18n + '**/*', {base: './src/client/locales'})
            .pipe(gulp.dest(config.path.build + 'json/'));

        if (typeof browserSync !== 'undefined') {
            myPipe.on('end', browserSync.reload);
        }

        return myPipe;
    };
};
