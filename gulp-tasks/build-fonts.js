/**
 * Copy fonts
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {

        log('Copying fonts');

        return gulp
            .src([
                config.path.client + 'fonts/**/*.*'
            ])
            .pipe(gulp.dest(config.path.fonts));
    };
};
