/**
 * Created by manh.vu on 7/10/2016.
 */

var gulp = require('gulp'),
	size = require('gulp-size'),
	uglify = require('gulp-uglify'),
	path = require('path'),
	rename = require('gulp-rename'),
	webpack = require('gulp-webpack');

var outputDir = './../assets/bin';

gulp.task('build', function () {
	return gulp.src('./main.js')
		.pipe(webpack({
				node: {
					fs: "empty"
				},
				output: {
					filename: 'member-manager.js'
				},
				resolve: {
					alias: {},
					root: [
						path.join(path.resolve('./modules'), 'vendor'),
						path.join(path.resolve('./modules'), 'config')
					]
				},
				externals: {
				}
			})
		)
		.pipe(size())
		.pipe(gulp.dest(outputDir))
		.pipe(rename('member-manager.min.js'))
		.pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest(outputDir));
});

gulp.task('default', ['build']);