'use strict';
/*
*	appController
*	Description
*	appController controls the Application Level Scope Data.
*/

(function() {
	var appController = function($rootScope, pageTitleService, metaInformationService) {
		/*
		*	assigns pageTitleService and metaInformationService to $rootScope
		*	so that both are available in the Head section of HTML page
		*/

		$rootScope.pageTitleService = pageTitleService;
		$rootScope.metaInformationService = metaInformationService;


	};

	appController.$inject = ['$rootScope', 'pageTitleService', 'metaInformationService'];
	module.exports = appController;
})();
