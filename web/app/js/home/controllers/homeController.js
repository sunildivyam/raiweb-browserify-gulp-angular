'use strict';
/*
*	homeController
*	Description
*	homeController controls the Home page Level Scope Data.
*/

(function() {
	var homeController = function($scope, appHeaderService, servicesService) {
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
						mainCarousel.slides = slidesObjs;
						$scope.homeCarousel = mainCarousel;
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
