(function() {
    'use strict';

    var gulp        = require('gulp');
    var gulpsync    = require('gulp-sync')(gulp);
    var args        = require('yargs').argv;
    var plugins     = require('gulp-load-plugins')({lazy: true});
    var log         = require('./gulp-tasks/util/log');
    var serve       = require('./gulp-tasks/serve');
    var config      = require('./gulp.config')();

    //////////

    function getTask(task) {
        return require('./gulp-tasks/' + task)(gulp, plugins, config, args);
    }

    gulp
        .task('default', ['help'])
        .task('help', plugins.taskListing)
        .task('vet', getTask('vet'))
        .task('test', ['vet', 'build-templatecache'], getTask('test'))
        .task('jscs-fix', getTask('jscs-fix'))
        .task('plato', getTask('plato'))
        .task('clean-styles', getTask('clean-styles'))
        .task('clean-fonts', getTask('clean-fonts'))
        .task('clean', getTask('clean'))
        .task('inject-wiredep', getTask('inject-wiredep'))
        .task('inject-jsAppDep', getTask('inject-jsAppDep'))
        .task('inject-styles', ['build-styles'], getTask('inject-styles'))
        .task('build-styles', ['clean-styles'], getTask('build-styles'))
        .task('build-fonts', ['clean-fonts'], getTask('build-fonts'))
        .task('build-templatecache', getTask('build-templatecache'))
        .task('build-inject', gulpsync.sync(['inject-wiredep', 'inject-jsAppDep', 'inject-styles']))
        .task('build', gulpsync.sync(['test', 'build-inject', 'build-fonts']),getTask('build'))
        .task('build-specs', ['build-templatecache'], getTask('build-specs'))
        .task('package-i18n', getTask('package-i18n'))
        .task('package-images', getTask('package-images'))
        .task('package-fonts', getTask('package-fonts'))
        .task('package-html-static', getTask('package-html-static'))
        .task('package-optimize',
             gulpsync.sync(['clean', 'build', 'package-html-static', 'package-i18n',
                 'package-html-static', 'package-fonts', 'package-images']),
             getTask('package-optimize'));

    /**
    * serve the dev environment
    * --debug-brk or --debug
    * --nosync
    */

    gulp.task('serve-dev', ['build'], function() {
        // serve(true /*isDev*/);
        serve(gulp, plugins, config, args, true /*isDev*/, false /* specRunner */);
    });

    /**
    * serve the build environment
    * --debug-brk or --debug
    * --nosync
    */
    gulp.task('serve-build', [], function() {
        serve(gulp, plugins, config, args, false /*isDev*/, false /* specRunner */);
    });

    /**
     * Run the spec runner
     * @return {Stream}
     */
    gulp.task('serve-specs', ['build-specs'], function(done) {
        log('run the spec runner');
        serve(gulp, plugins, config, args, true /* isDev */, true /* specRunner */);
        done();
    });

    module.exports = gulp;
})();
