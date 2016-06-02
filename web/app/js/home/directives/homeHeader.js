'use strict';
(function() {
	var homeHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'home/home-header.html',
			link: function() {

			}
		};
	};

	homeHeader.$inject = [];
	module.exports = homeHeader;
})();
