'use strict';
/*
*	articlesController
*	Description
*	articlesController controls the Articles page Level Scope Data.
*/

(function() {
	var articlesController = function($rootScope, $scope, $state, articlesService, metaInformationService, pageTitleService) {
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

			if (currentStateName) {
				articlesService.getArticleByStateName(currentStateName).then(function(article) {
					if (article instanceof Object) {
						$scope.currentArticle = article;
					} else {
						$scope.currentArticle = undefined;
					}
					setMetaInfo(article);
					loadRelatedArticles(article && article.relatedArticles);
				}, function() {
					setMetaInfo();
					$scope.currentArticle = undefined;
					loadRelatedArticles(null);
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

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				loadArticleForCurrentState(toState.name);
			}
		});
	};

	articlesController.$inject = ['$rootScope', '$scope', '$state', 'articlesService', 'metaInformationService', 'pageTitleService'];
	module.exports = articlesController;
})();
