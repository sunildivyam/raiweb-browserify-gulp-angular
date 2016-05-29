# raiweb-browserify-gulp-angular
## Gulp Tasks:
	### browserify
	Gulp task "browserify" uses 'index.js' as entry point and
	concatinates all dependencies and sub dependencies of index.js
	and generates "target/index.js"
	Note: I does not add angular templateCache dependency "templates.js". To
	add this, Run gulp task "buildjs" which runs a sequence of gulp Tasks:
	ngTemplateCache -> browserify -> cleanNgTemplateCache
