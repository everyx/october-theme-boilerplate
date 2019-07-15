const mix = require('laravel-mix');
const glob = require('glob-all');

require('laravel-mix-imagemin');
require('laravel-mix-purgecss');

mix.setPublicPath('assets')
    .js('assets/resources/js/app.js', 'js').sourceMaps(true, 'source-map')
    .sass('assets/resources/sass/app.scss', 'css').options({processCssUrls: false})
    .purgeCss({
        paths: () => glob.sync([
            path.join(__dirname, 'resources/js/*.js'),
            path.join(__dirname, 'content/**/*'),
            path.join(__dirname, 'layout/**/*'),
            path.join(__dirname, 'meta/**/*'),
            path.join(__dirname, 'pages/**/*'),
            path.join(__dirname, 'partials/**/*'),
        ], { nodir: true }),
    })
    .imagemin('images/**.*', {
            context: 'assets/resources',
        }, {
            jpegtran: null, mozjpeg: { progressive: true, quality: 65,},
            optipng: null, pngquant: { quality: '65-90', speed: 4, strip: true},
            gifsicle: {interlaced: false,},
            webp: {quality: 75,}
        }
    )
    .browserSync('aoke-elec.com')
    .version();
