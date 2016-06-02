'use strict';
/*
*	servicesController
*	Description
*	servicesController controls the Services page Level Scope Data.
*/

(function() {
	var servicesController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	servicesController.$inject = ['$rootScope'];
	module.exports = servicesController;
})();
