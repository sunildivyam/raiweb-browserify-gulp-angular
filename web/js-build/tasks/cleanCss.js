'use strict';
/*
	Gulp task "cleanCss" uses 'main.css' and minifies it into 'main.min.css'
*/

var cleanCss = require('gulp-clean-css');

module.exports = function(gulp, config) {
	gulp.task('cleanCss', function() {
		return gulp.src(config.targetDir + '/' + config.stylesDir + '/main.css')
		.pipe(cleanCss())
		.pipe(gulp.dest(config.targetDir + '/' + config.stylesDir));
	});
};
