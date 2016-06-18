'use strict';
/*
*	servicesController
*	Description
*	servicesController controls the Services page Level Scope Data.
*/

(function() {
	var servicesController = function($rootScope, $scope, $state,servicesService) {
		function loadServiceForCurrentState(currentStateName) {
			$scope.currentService = {};
			$scope.relatedServices = {};

			if (currentStateName) {
				servicesService.getServiceByStateName(currentStateName).then(function(service) {
					if (service instanceof Object) {
						$scope.currentService = service;
					} else {
						$scope.currentService = undefined;
					}
					loadRelatedServices(service && service.relatedServices);
				}, function() {
					$scope.currentService = undefined;
					loadRelatedServices(null);
				});
			}
		}

		function loadRelatedServices(serviceIds) {
			if(serviceIds instanceof Array && serviceIds.length > 0) {
				servicesService.getServicesByIds(serviceIds).then(function(services) {
					$scope.relatedServices = services;
				});
			} else {
				$scope.relatedServices = undefined;
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
