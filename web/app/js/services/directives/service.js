'use strict';
(function() {
	var service = function() {
		return {
			restrict: 'E',
			scope: {
				service: "="
			},
			templateUrl: 'services/service.html',
			link: function() {

			}
		};
	};

	service.$inject = [];
	module.exports = service;
})();
