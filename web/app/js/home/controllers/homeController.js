'use strict';
/*
*	homeController
*	Description
*	homeController controls the Home page Level Scope Data.
*/

(function() {
	var homeController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	homeController.$inject = ['$rootScope'];
	module.exports = homeController;
})();
