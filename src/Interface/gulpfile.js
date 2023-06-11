const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp
    .src('public/stylesheets/login.css') // Path to your main SCSS file
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/stylesheets/css')); // Output directory for the compiled CSS
});


gulp.task('default', gulp.series('sass'));
