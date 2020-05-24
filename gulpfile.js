'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del  = require('del');

gulp.task('clean', function () {
  return del('build');

});

gulp.task('copyJs', function () {
  return gulp.src([
    'source/js/**'  ])
  .pipe(gulp.dest('build/js'));
});

gulp.task('copy', function () {
    return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/js/**',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('copyImg', function () {
  return gulp.src([
    'source/img/**'  ])
  .pipe(gulp.dest('build/img'));
});


gulp.task('html', function () {
  return gulp.src('source/*.html')

      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest('build'));
});


gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.mine.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('sprite', function () {
  return gulp.src('source/img/sprite/*.svg')
  .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task('refresh', function (done) {
    server.reload();
    done();
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/sprite/*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('copyJs', 'refresh'));
  gulp.watch('source/img/*.{png,jpg,svg}', gulp.series('copyImg', 'refresh'));
});


gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'sprite',
  'html'
));

gulp.task('start', gulp.series('build', 'server'));

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 4}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'));
});
