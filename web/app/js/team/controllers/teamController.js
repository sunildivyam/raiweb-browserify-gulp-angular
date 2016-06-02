'use strict';
/*
*	teamController
*	Description
*	teamController controls the team page Level Scope Data.
*/

(function() {
	var teamController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	teamController.$inject = ['$rootScope'];
	module.exports = teamController;
})();
