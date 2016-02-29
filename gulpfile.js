const gulp = require('gulp'),
    mocha = require('gulp-mocha');

require('babel-core/register');

gulp.task('mocha', [], function () {
    return gulp.src('./*/test/**/*.spec.js')
        .pipe(mocha({
        }));
});
