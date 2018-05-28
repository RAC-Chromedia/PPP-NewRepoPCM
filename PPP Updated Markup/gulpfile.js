var gulp = require('gulp');
var $ 	 = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sassPaths = [
	'node_modules/bootstrap/scss',
	'bower_components/font-awesome/scss'
];

gulp.task('sass', function () {
	return gulp.src('application/scss/styles.scss')
	.pipe($.sass({
		includePaths: sassPaths,
		outputStyle: 'compressed'
	}).on('error', $.sass.logError))
	.pipe(gulp.dest('application/css'))
	.pipe(reload({ stream: true }));
});

gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir:  ['./', 'application']
		}
	});

	gulp.watch(['application/scss/**/*.scss'], ['sass']);
	gulp.watch('application/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass'], function() {
	gulp.watch(['application/*.html'], ['application/scss/**/*.scss'], ['sass']);
});