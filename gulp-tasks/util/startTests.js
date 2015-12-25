/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
module.exports = function startTests(singleRun, config, args, done) {
    'use strict';
    var debug = args.debug;
    var child;
    var excludeFiles = [];

    var log = require('./log');
    var fork = require('child_process').fork;
    var karma = require('karma').server;
    var serverSpecs = config.path.serverIntegrationSpecs;

    if (args.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork(config.server.nodeServer);
    } else {
        if (serverSpecs && serverSpecs.length) {
            excludeFiles = serverSpecs;
        }
    }

    var configKarma = {
            configFile: __dirname + '/../../karma.conf.js',
            exclude: excludeFiles,
            singleRun: !!singleRun
        };

    if (!singleRun) {
        configKarma.reporters = ['progress'];
    }

    if (debug) {
        configKarma.browsers = ['Chrome'];
    }

    karma.start(configKarma, karmaCompleted);

    ////////////////


    function karmaCompleted(karmaResult) {
        log('Karma completed');
        if (child) {
            log('shutting down the child process');
            child.kill();
        }
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
};
