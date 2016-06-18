'use strict';
/*
*	homeController
*	Description
*	homeController controls the Home page Level Scope Data.
*/

(function() {
	var homeController = function($scope, appHeaderService, servicesService) {
		resetCarousel();
		function resetCarousel() {
			$scope.homeCarousel = {
				"slides": [],
				"options": {}
			};
		}

		appHeaderService.getMainCarousel().then(function(mainCarousel) {
			if (mainCarousel instanceof Object) {
				servicesService.getServicesByIds(mainCarousel.slides).then(function(slidesObjs) {
					if (slidesObjs instanceof Array) {
						$scope.homeCarousel.slides = slidesObjs;
						$scope.homeCarousel.options = angular.copy(mainCarousel.options);
					} else {
						resetCarousel();
					}
				}, function() {
					resetCarousel();
				});
			} else {
				resetCarousel();
			}
		}, function() {
			resetCarousel();
		});
	};

	homeController.$inject = ['$scope', 'appHeaderService', 'servicesService'];
	module.exports = homeController;
})();
