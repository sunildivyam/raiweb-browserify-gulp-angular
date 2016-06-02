'use strict';
(function() {
	var portfolioHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'portfolio/portfolio-header.html',
			link: function() {

			}
		};
	};

	portfolioHeader.$inject = [];
	module.exports = portfolioHeader;
})();
