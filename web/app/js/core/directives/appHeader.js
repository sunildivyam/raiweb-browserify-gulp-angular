'use strict';
(function() {
	var appHeader = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				logo: '=',
				navs: '='
			},
			templateUrl: 'core/app-header.html',
			link: function() {

			}
		};
	};

	appHeader.$inject = [];
	module.exports = appHeader;
})();