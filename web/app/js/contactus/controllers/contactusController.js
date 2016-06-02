'use strict';
/*
*	contactusController
*	Description
*	contactusController controls the contactus page Level Scope Data.
*/

(function() {
	var contactusController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	contactusController.$inject = ['$rootScope'];
	module.exports = contactusController;
})();
