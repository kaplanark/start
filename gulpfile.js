const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const reload = browserSync.reload
const php = require('gulp-connect-php');



function browser_sync() {
  php.server({}, function (){
    browserSync.init({
      proxy: '127.0.0.1:8000'
    });
  });
}

function watchFiles() {
  gulp.watch('./*.html').on('change', reload)
  gulp.watch('./*.php').on('change', reload)
  // gulp.watch('./*.php').on('add', reload)
  gulp.watch('./includes/**/*.php').on('change', reload)
  gulp.watch('./front/js/*.js').on('change', reload)
  gulp.watch('./front/scss/**/*.scss', gulp.series(css))
}

function css() {
  return gulp.src('./front/scss/main.scss')
      .pipe(plumber([{errorHandler: false}]))
      .pipe(sass())
      .pipe(prefix('last 2 versions'))
      .pipe(gulp.dest('./front/css/'))
      .pipe(browserSync.stream())
}

const browser = gulp.parallel(browser_sync, watchFiles);

exports.default = gulp.parallel(browser, css);
