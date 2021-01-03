const {src, dest, parallel, series, watch} = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    del = require('del'),
    webpackStream = require('webpack-stream'),
    tinypng = require('gulp-tinypng-compress');

const fonts = () => {
    src('./src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('./dist/fonts/'))
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts/'))
}

const styles = () => {
    return src('./src/scss/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}

const htmlInclude = () => {
    return src('./src/index.html')
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());
}

const imgApp = () => {
    return src('./src/img/**/*')
        .pipe(dest('./dist/img'))
}

const iconsApp = () => {
    return src('./src/icons/**/*')
        .pipe(dest('./dist/icons'))
}

const assets = () => {
    return src('./src/assets/**')
        .pipe(dest('./dist'))
}

const clean = () => {
    return del(['dist/*'])
}

const scripts = () => {
    return src('./src/js/main.js')
        .pipe(webpackStream({
            output: {
                filename: 'main.js',
            },
            module: {
                        rules: [
                            {
                            test: /\.m?js$/,
                                exclude: /node_modules/,
                                use: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            ['@babel/preset-env', { 
                                                targets: {
                                                edge: "17",
                                                firefox: "60",
                                                chrome: "67",
                                                safari: "11.1",
                                                ie: "10"
                                                },
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage"
                                    }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
        .pipe(sourcemaps.init())
        .pipe(rename({
            basename: 'script',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream())
    }

    const scriptAdd = () => {
        return src('./src/js/libs/**/*.js')
        .pipe(dest('./dist/js'))
    }
const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    watch('./src/scss/**/*.scss', styles);
    watch('./src/index.html', htmlInclude);
    watch('./src/img/**/*', imgApp);
    watch('./src/icons/**/*', iconsApp);
    watch('./src/assets/**', assets);
    watch('./src/fonts/**.ttf', fonts);
    watch('./src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, fonts,styles, scripts, scriptAdd, imgApp, iconsApp, assets), watchFiles);

const tinypngEnd = () => {
    return src('./src/img/**/*')
        .pipe(tinypng({
            key: ''
        }))
        .pipe(dest('./dist/img'))
}

const stylesBuild = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('./dist/css/'))
}

const scriptsBuild = () => {
    return src('./src/js/main.js')
        .pipe(webpackStream({
            output: {
                filename: 'main.js',
            },
            module: {
                        rules: [
                            {
                            test: /\.m?js$/,
                                exclude: /node_modules/,
                                use: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            ['@babel/preset-env', { 
                                                targets: {
                                                edge: "17",
                                                firefox: "60",
                                                chrome: "67",
                                                safari: "11.1",
                                                ie: "10"
                                                },
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage"
                                    }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); 
		})
        .pipe(rename({
            basename: 'script',
            suffix: '.min'
        }))
        .pipe(dest('./dist/js'))
    }

    exports.build = series(clean, parallel(htmlInclude, fonts, stylesBuild, scriptsBuild, scriptAdd, imgApp, assets), tinypngEnd)