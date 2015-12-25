/**
 * Setting envoriment constants
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var env = args.env ? args.env : 'development';

    return function(src, dest) {
        log('Setting constants ');
        gulp.src([config.path.build + src])
            .pipe(plugins.replace('%END_POINT_PUB%', config.environment[env].sanitasPublicApi))
            .pipe(plugins.replace('%END_POINT%', config.environment[env].sanitasPrivateApi))
            .pipe(plugins.replace('%END_POINT_CITAS%', config.environment[env].sanitasCitasApi))
            .pipe(plugins.replace('%END_POINT_AUTH%', config.environment[env].auth))
            .pipe(plugins.replace('%END_POINT_AUTH_REFRESH%', config.environment[env].authRefresh))
            .pipe(plugins.replace('%CREDAUTH%', config.environment[env].credAuth))
            .pipe(plugins.replace('%END_POINT_CMI%', config.environment[env].sanitasCMIApi))
            .pipe(plugins.replace('%END_POINT_REPORTS%', config.environment[env].sanitasPrivateReportsApi))
            .pipe(plugins.replace('%SHOWBACKFAILS%', config.environment[env].showBackFails))
            .pipe(plugins.replace('%SHOWEXCEPTION%', config.environment[env].showExceptions))
            .pipe(plugins.replace('%PHEMIUMENVIRONMENT%', config.environment[env].phemiumEnvironment))
            .pipe(plugins.replace('%ENV%', env))
            .pipe(gulp.dest(config.path.build + dest));
    };

};
