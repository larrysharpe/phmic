/**
* Compile sass to css
*/
module.exports = function (gulp, plugins, config, args, browserSync) {
    'use strict';

    var log = require('./util/log');
    var errorHandler = require('./util/error-handler');

    return function() {
        log('Compiling Sass --> CSS');

        var sassOptions = {
            style: 'expanded',
            errLogToConsole: true
        };

        var injectFiles = gulp.src([
            config.path.app + '**/*.scss',
            '!' + config.path.sass
        ], {read: false});

        var injectOptions = {
            transform: function(filePath) {
                // filePath.replace('src/client/app/', '../app/');
                return '@import "' + filePath + '";';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        var myPipe = gulp.src(config.path.saasMainFile)
            .pipe(plugins.inject(injectFiles, injectOptions))
            .pipe(plugins.sass(sassOptions)).on('error', errorHandler('Sass'))
            .pipe(plugins.autoprefixer()).on('error', errorHandler('Autoprefixer'))
            //.pipe(plugins.rename('sanitas.' + config.app.module + '.css'))
            //.pipe(gulpif(config.app.module === 'shared', gulp.dest('./lib/sanitas-responsive')))
            .pipe(gulp.dest(config.path.css));

        if (typeof browserSync !== 'undefined') {
            myPipe.pipe(browserSync.stream({match: '**/*.css'}));
        }

        return myPipe;

    };
};
