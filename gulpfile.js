var gulp = require('gulp');
var browserify = require('gulp-browserify');
gulp.task('mainJS', function () {
    return gulp.src('src/js/main.js', { read: false })
        .pipe(browserify())
        .pipe(gulp.dest('./build/'))
});

gulp.task('backgroundJs', function () {
    return gulp.src('./background.js', { read: false })
        .pipe(browserify())
        .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function () {
    gulp.watch('./background.js', gulp.series('backgroundJs'));
    gulp.watch('./src/js/main.js', gulp.series('mainJS'));
});

gulp.task('default', gulp.parallel('watch'));