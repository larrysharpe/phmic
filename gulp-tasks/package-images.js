/**
 * Compress images
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');
    var pngquant = require('imagemin-pngquant');

    return function() {
        log('Compressing and copying images');
        var imgSrc = [config.path.img + '**/*.*', '!' + config.path.img + '/temp/**/*.*'];
        var imgDst = config.path.build + 'img';

        return gulp
            .src(imgSrc)
            .pipe(plugins.changed(imgDst))
            .pipe(plugins.print())
            .pipe(plugins.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(imgDst));

    };
};
