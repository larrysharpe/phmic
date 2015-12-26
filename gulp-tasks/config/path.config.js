module.exports = function(config) {
    'use strict';

    var client = './src/client/';
    var assets = client + 'assets/';
    var server = './src/server/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var nodeModules = 'node_modules';

    var bower = {
        json: require('../../bower.json'),
        directory: './lib/',
        ignorePath: '../..'
    };

    config.path = {
        // all javascript that we want to vet
        alljs: [
            './src/client/app/**/*.js',
            './src/client/test/**/*.js',
            './src/client/mocks/**/*.js',
            './*.js',
        ],
        build: './build/',
        dist: './dist/',
        client: client,
        server:server,
        app: clientApp,
        css: assets + 'css/',
        fonts: assets + 'css/fonts/',
        html: client + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        img: assets + 'img/',
        mocks: client + 'mocks/',
        index: client + 'index.html',
        i18n: assets + 'locales/',
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
        ],
        jsOrder: [
            '**/app.module.js',
            '**/app.mocks.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        mocksjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            client + 'mocks/**/*.js'
        ],
        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        /**
         * plato
         */
        plato: {
            js: clientApp + '**/*.js'
        },
        report: client + 'reports/',
        report: report,
        root: root,
        sass: client + 'scss/**/*.scss',
        saasMainFile: client + 'scss/styles.scss',
        server: server,
        source: 'src/',

        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            nodeModules + '/mocha/mocha.js',
            nodeModules + '/chai/chai.js',
            nodeModules + '/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [client + 'test-helpers/*.js'],
        specs: [clientApp + '**/*.spec.js'],
        serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js'],

        temp: temp,
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standalone: false
            }
        },

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
            './package.json',
            './bower.json'
        ]
    };

    return config;
};
