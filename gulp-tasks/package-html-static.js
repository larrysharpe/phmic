/**
 * Copy html-templates
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying static html');

        return gulp
            .src(config.path.client + '/html-static/**/*')
            .pipe(gulp.dest(config.path.build + '/html-static'));
    };
};
