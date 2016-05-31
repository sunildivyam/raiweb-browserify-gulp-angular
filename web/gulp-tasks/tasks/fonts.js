'use strict';
module.exports = function(gulp, config) {
	gulp.task('fonts', function() {
		gulp.src(config.fontsDir + '/**/*')
		.pipe(gulp.dest(config.targetDir + '/' + config.fontsDir));
	});
};