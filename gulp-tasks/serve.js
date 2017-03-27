/**
 * Start Node Server and browserSync
 */
module.exports = function (gulp, plugins, config, args, isDev, specRunner) {
    'use strict';

    // var del = require('del');
    var browserSync = require('browser-sync').create();
    var log         = require('./util/log');
    var port        = process.env.PORT || config.server.defaultPort;

    var injectJsAppDep  = require('./inject-jsAppDep')(gulp, plugins, config, args, browserSync);
    var buildStyles     = require('./build-styles')(gulp, plugins, config, args);
    var packageOptimize = require('./package-optimize')(gulp, plugins, config, args, browserSync);

    /**
     * serve the code
     * --debug-brk or --debug
     * --nosync --no-test
     * @param  {Boolean} isDev - dev or build mode
     * @param  {Boolean} specRunner - server spec runner html
     */

    var debugMode   = '--debug';
    var nodeOptions = getNodeOptions(isDev);

    nodeOptions.nodeArgs = [debugMode + '=5858'];

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return plugins.nodemon(nodeOptions)
        .on('restart', ['vet'], function (ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.server.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });

    function getNodeOptions(isDev) {
        return {
            script   : config.server.nodeServer,
            delayTime: 1,
            env      : {
                'PORT'    : port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch    : [config.path.server]
        };
    }

    //function runNodeInspector() {
    //    log('Running node-inspector.');
    //    log('Browse to http://localhost:8080/debug?port=5858');
    //    var exec = require('child_process').exec;
    //    exec('node-inspector');
    //}

    /**
     * Start BrowserSync
     * --nosync will avoid browserSync
     */
    function startBrowserSync(isDev, specRunner) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting BrowserSync on port ' + port);
        var source;
        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches sass, compiles it to css, browser-sync handles reload
        if (isDev) {
            // Current Module SASS
            plugins.watch([config.path.client + '**/*.scss'], buildStyles)
                .on('change', changeEvent);

            // Current Module JS
            // If we create or delete javascript files we re-inject in the index.html
            source = [].concat(config.path.app + '**/*.js', 'src/client/mocks/**/*.js');
            plugins.watch(source, {events: ['add', 'unlink', 'unlinkDir']}, injectJsAppDep)
                .on('change', changeEvent);

            plugins.watch(source, {events: ['change']})
                .on('change', browserSync.reload);

            // Html Files
            plugins.watch(config.path.app + '**/*.html', {events: ['add', 'change', 'unlink', 'unlinkDir']})
                .on('change', browserSync.reload);

            // Translation file
            plugins.watch(config.path.i18n + '**/*.json', {events: ['add', 'change', 'unlink', 'unlinkDir']})
                .on('change', browserSync.reload);

        } else {
             source = [].concat(config.path.js, config.path.sass, config.path.html);
            plugins.watch(source,
                {events: ['add', 'change', 'unlink', 'unlinkDir']}, packageOptimize)
                .on('change', changeEvent);
        }

        var options = {
            proxy         : 'localhost:' + port,
            port          : 3000,
            files         : isDev ? [
                // config.path.client + '**/*.*',  => we manually reload after task completed
                config.path.css + '**/*.css',
                '!src/client/**/*.scss'
            ] : [],
            ghostMode     : { // these are the defaults t,f,t,t
                clicks  : true,
                location: false,
                forms   : true,
                scroll  : true
            },
            injectChanges : true,
            logFileChanges: true,
            logLevel      : 'info',
            logPrefix     : 'Silent drop platform',
            notify        : true,
            reloadDelay   : 0 //1000
        };
        if (specRunner) {
            options.startPath = config.path.specRunnerFile;
        }

        browserSync.init(options);
    }

    function changeEvent(filePath) {
        console.log('[Change event:', filePath, ']');
    }

};
