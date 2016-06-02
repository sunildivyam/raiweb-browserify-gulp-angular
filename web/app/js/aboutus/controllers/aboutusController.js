'use strict';
/*
*	aboutusController
*	Description
*	aboutusController controls the aboutus page Level Scope Data.
*/

(function() {
	var aboutusController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	aboutusController.$inject = ['$rootScope'];
	module.exports = aboutusController;
})();
