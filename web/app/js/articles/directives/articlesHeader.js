'use strict';
(function() {
	var articlesHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'articles/articles-header.html',
			link: function() {

			}
		};
	};

	articlesHeader.$inject = [];
	module.exports = articlesHeader;
})();
