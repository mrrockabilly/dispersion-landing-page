var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function () {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compr-img', () =>
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

gulp.task('scripts', function () {
  gulp.src('js/*.js')
    // .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('minify-css', function () {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', function () {
  gulp.run('minify', 'compr-img', 'scripts', 'minify-css');
  gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts'])
  })
  gulp.watch('css/*.css', function (event) {
    gulp.run('minify-css');
  })
  gulp.watch('*.html', function (event) {
    gulp.run('minify');
  })
})