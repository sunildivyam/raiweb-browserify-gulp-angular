'use strict';
/*
*	contactusController
*	Description
*	contactusController controls the contactus page Level Scope Data.
*/

(function() {
	var contactusController = function($rootScope, $scope, metaInformationService, pageTitleService) {
		function setMetaInfo(contactusNav) {
			if (contactusNav instanceof Object) {
				metaInformationService.setMetaDescription(contactusNav.description);
				metaInformationService.setMetaKeywords(contactusNav.keywords);
				pageTitleService.setPageTitle(contactusNav.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				var contactusNav = $scope.getFirstLevelNavItemByStateName(toState.name);
				setMetaInfo(contactusNav);
			}
		});
	};

	contactusController.$inject = ['$rootScope', '$scope', 'metaInformationService', 'pageTitleService'];
	module.exports = contactusController;
})();
