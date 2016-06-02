'use strict';
/*
*	appController
*	Description
*	appController controls the Application Level Scope Data.
*/

(function() {
	var appController = function($rootScope, $scope, pageTitleService, metaInformationService, appHeaderService) {
		/*
		*	assigns pageTitleService and metaInformationService to $rootScope
		*	so that both are available in the Head section of HTML page
		*/

		$rootScope.pageTitleService = pageTitleService;
		$rootScope.metaInformationService = metaInformationService;

		// fetches the Application Header information
		appHeaderService.getAppHeaderInfo().then(function(data) {
			setAppHeader(data);

		}, function() {
			setAppHeader(false);	// resets the Header Information
		});

		/*
		*	setAppHeader is a private method
		*	It takes an Object param, and sets the various Header Information
		* 	If param of anyother type is passed, it resets all the Header Information to null.
		*	So This method can be used to reset Header Information by passing false valueto param
		*/
		function setAppHeader(headerInfo) {
			if (headerInfo instanceof Object) {
				$scope.appHeader = {
					logo: headerInfo.logo || null,
					navs: headerInfo.navs || null
				};
			} else {
				$scope.appHeader = {
					logo: null,
					navs: null
				};
			}
		}
	};

	appController.$inject = ['$rootScope', '$scope', 'pageTitleService', 'metaInformationService', 'appHeaderService'];
	module.exports = appController;
})();
