'use strict';
/*
	Gulp task "uglify" uses 'index.js' and minifies it into 'index.min.js'
*/

var uglify = require('gulp-uglify');

module.exports = function(gulp, config) {
	gulp.task('uglify', function() {
		return gulp.src(config.targetDir + '/' + config.main)
		.pipe(uglify())
		.pipe(gulp.dest(config.targetDir));
	});
};
