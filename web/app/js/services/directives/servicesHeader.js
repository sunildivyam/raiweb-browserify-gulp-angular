'use strict';
(function() {
	var servicesHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'services/services-header.html',
			link: function() {

			}
		};
	};

	servicesHeader.$inject = [];
	module.exports = servicesHeader;
})();
