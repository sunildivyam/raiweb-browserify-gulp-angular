'use strict';
/*
*	articlesController
*	Description
*	articlesController controls the Articles page Level Scope Data.
*/

(function() {
	var articlesController = function($rootScope, $scope, $state, servicesService, articlesService, metaInformationService, pageTitleService) {
		function setMetaInfo(article) {
			if (article instanceof Object) {
				metaInformationService.setMetaDescription(article.shortDescription);
				metaInformationService.setMetaKeywords(article.tags);
				pageTitleService.setPageTitle(article.name);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function loadArticleForCurrentState(currentStateName) {
			$scope.currentArticle = {};
			$scope.relatedArticles = {};
			$scope.relatedServices = {};

			if (currentStateName) {
				articlesService.getArticleByStateName(currentStateName).then(function(article) {
					if (article instanceof Object) {
						$scope.currentArticle = article;
					} else {
						$scope.currentArticle = undefined;
					}
					setMetaInfo(article);
					loadRelatedArticles(article && article.relatedArticles);
					loadRelatedServices(article && article.relatedServices);
				}, function() {
					setMetaInfo();
					$scope.currentArticle = undefined;
					loadRelatedArticles(null);
					loadRelatedServices(null);
				});
			}
		}

		function loadRelatedArticles(articleIds) {
			if(articleIds instanceof Array && articleIds.length > 0) {
				articlesService.getArticlesByIds(articleIds).then(function(articles) {
					$scope.relatedArticles = articles;
				});
			} else {
				$scope.relatedArticles = undefined;
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
				loadArticleForCurrentState(toState.name);
			}
		});
	};

	articlesController.$inject = ['$rootScope', '$scope', '$state', 'servicesService', 'articlesService', 'metaInformationService', 'pageTitleService'];
	module.exports = articlesController;
})();
