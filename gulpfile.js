var gulp = require('gulp');
var browserify = require('gulp-browserify');
var cleanCSS = require('gulp-clean-css');

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

gulp.task('minify-popup-css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./background.js', gulp.series('backgroundJs'));
    gulp.watch('./src/js/main.js', gulp.series('mainJS'));
    gulp.watch('./src/css/*.css', gulp.series('minify-popup-css'));
});

gulp.task('default', gulp.parallel('watch'));