const gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('mocha', () => {
    return gulp.src('*/test/**/*.spec.js', {read: false})
        .pipe(mocha({}));
});
