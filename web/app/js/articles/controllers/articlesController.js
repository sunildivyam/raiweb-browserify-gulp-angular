'use strict';
/*
*	articlesController
*	Description
*	articlesController controls the articles page Level Scope Data.
*/

(function() {
	var articlesController = function($rootScope) {
		$rootScope.temp = 'temp var';
	};

	articlesController.$inject = ['$rootScope'];
	module.exports = articlesController;
})();
