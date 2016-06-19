'use strict';
/*
*	articlesController
*	Description
*	articlesController controls the Articles page Level Scope Data.
*/

(function() {
	var articlesController = function($rootScope, $scope, $state,articlesService) {
		function loadArticleForCurrentState(currentStateName) {
			$scope.currentArticle = {};
			$scope.relatedArticles = {};

			if (currentStateName) {
				articlesService.getArticleByStateName(currentStateName).then(function(service) {
					if (service instanceof Object) {
						$scope.currentArticle = service;
					} else {
						$scope.currentArticle = undefined;
					}
					loadRelatedArticles(service && service.relatedArticles);
				}, function() {
					$scope.currentArticle = undefined;
					loadRelatedArticles(null);
				});
			}
		}

		function loadRelatedArticles(serviceIds) {
			if(serviceIds instanceof Array && serviceIds.length > 0) {
				articlesService.getArticlesByIds(serviceIds).then(function(articles) {
					$scope.relatedArticles = articles;
				});
			} else {
				$scope.relatedArticles = undefined;
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				loadArticleForCurrentState(toState.name);
			}
		});
	};

	articlesController.$inject = ['$rootScope', '$scope', '$state', 'articlesService'];
	module.exports = articlesController;
})();
