'use strict';
/*
*	servicesController
*	Description
*	servicesController controls the Services page Level Scope Data.
*/

(function() {
	var servicesController = function($rootScope, $scope, $state,servicesService) {
		function loadServiceForCurrentState(currentStateName) {
			if (currentStateName) {
				servicesService.getServiceByStateName(currentStateName).then(function(service) {
					if (service instanceof Object) {
						$scope.currentService = service;
					} else {
						$scope.currentService = undefined;
					}
				}, function() {
					$scope.currentService = undefined;
				});
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				loadServiceForCurrentState(toState.name);
			}
		});
	};

	servicesController.$inject = ['$rootScope', '$scope', '$state', 'servicesService'];
	module.exports = servicesController;
})();
