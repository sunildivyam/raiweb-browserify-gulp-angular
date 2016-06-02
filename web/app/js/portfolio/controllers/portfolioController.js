'use strict';
/*
*	portfolioController
*	Description
*	portfolioController controls the Portfolio page Level Scope Data.
*/

(function() {
	var portfolioController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	portfolioController.$inject = ['$rootScope'];
	module.exports = portfolioController;
})();
