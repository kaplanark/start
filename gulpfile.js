const gulp = require('gulp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const dotenv = require("dotenv");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const php = require('gulp-connect-php');
const cleancss = require("gulp-clean-css");
const rename = require('gulp-rename');
const del = require("del");
const fs = require('fs');
const path = require('path');
const reload = browserSync.reload;
dotenv.config();

function browser_sync() {
    php.server({}, function () {
        browserSync.init({
            proxy: '127.0.0.1:8000'
        });
    });
}

function watch_files() {
    gulp.watch('./*.html').on('change', reload)
    gulp.watch('./*.php').on('change', reload)
    gulp.watch('./pages/**/*.php').on('change', reload)
    gulp.watch('./includes/**/*.php').on('change', reload)
    gulp.watch('./assets/js/*.js').on('change', reload)
    gulp.watch('./scss/**/*.scss', gulp.series(libs_css, main_css))
}

function libs_css() {
    return gulp.src('./scss/libs.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream())
}

function main_css() {
    return gulp.src('./scss/main.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream())
}

//use 'gulp deploy' command to deploy
gulp.task('deploy', function () {
    let dirname = path.join(__dirname).replace(/^.*[\\\/]/, '');
    let conn = ftp.create({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        port: 21,
        parallel: 1,
        log: gutil.log
    });

    let globs = [
        'assets/**',
        'includes/**',
        'pages/**',
        'index.php'
    ];

    return gulp.src(globs, { base: '.', buffer: false, dot: true })
        .pipe(conn.newer('/' + `${process.env.hostdir}` + '/' + `${dirname}`))
        .pipe(conn.dest('/' + `${process.env.hostdir}` + '/' + `${dirname}`));

    /*
    return gulp.src(globs, {base: '.', buffer: false, dot: true})
    .pipe(conn.newer('/public_html/' + `${dirname}`)) // only upload newer files
    .pipe(conn.dest('/public_html/' + `${dirname}`));
    */

});

//for minfiyed css 
gulp.task("minify", () => {
    del(["./assets/css/main.css", "./assets/css/main.min.css"]);
    return gulp
        .src("./assets/css/main.css")
        .pipe(
            cleancss({ debug: true }, (details) => {
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log('/main.min.css: ' + `${details.stats.minifiedSize}`);
            })
        )
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("./assets/css/"));
});

gulp.task("minify-libs", () => {
    del(["./assets/css/libs.css", "./assets/css/libs.min.css"]);
    return gulp
        .src("./assets/css/libs.css")
        .pipe(
            cleancss({ debug: true }, (details) => {
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log('/libs.min.css: ' + `${details.stats.minifiedSize}`);
            })
        )
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("./assets/css/"));
});

gulp.task('version', function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('.version.txt', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data.toString());
            }
        });
        resolve();
    });
});

const browser = gulp.parallel(browser_sync, watch_files);

exports.default = gulp.parallel(browser, libs_css, main_css);

