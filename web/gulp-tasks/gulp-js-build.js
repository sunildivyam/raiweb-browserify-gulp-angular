'use strict';
var gulp = require('gulp');
var pkg = require('../package.json');
var runSequence = require('run-sequence');

var config = pkg.config;

config.name = pkg.name;
config.main = pkg.main;

require('./connect')(gulp, config);
require('./lint')(gulp, config);
require('./ngTemplateCache')(gulp, config);
require('./browserify')(gulp, config);
require('./html')(gulp, config);
require('./jsondata')(gulp, config);
require('./fonts')(gulp, config);
require('./images')(gulp, config);
require('./less')(gulp, config);
require('./uglify')(gulp, config);
require('./cleanCss')(gulp, config);
require('./clean')(gulp, config);

gulp.task('buildjs', function() {
	return runSequence('ngTemplateCache', 'browserify', 'cleanNgTemplateCache');
});

gulp.task('compile', function() {
	return runSequence('lint', ['buildjs', 'html', 'fonts', 'jsondata', 'images', 'less']);
});

gulp.task('package', function() {
	return runSequence('clean', 'compile', ['uglify', 'cleanCss']);
});

gulp.task('watch', function() {
	gulp.watch([config.sourceDir + '/**/*.js', config.sourceDir + '/pages/**/*.html'], ['buildjs']);
	gulp.watch(config.stylesDir + '/**/*.less', ['less']);
	gulp.watch(config.dataDir + '/**/*.json', ['jsondata']);
	gulp.watch(config.fontsDir + '/**/*', ['fonts']);
	gulp.watch(config.imagesDir + '/**/*', ['images']);
});

module.exports = function() {
};

