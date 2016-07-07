'use strict';
/*
*	searchService Service
*	Description
* 	searchService Service Search Functionality
*/
(function() {
	var searchService = function($q, servicesService, articlesService) {
		String.prototype.matchFeature = function(keywords) {
			if (!keywords) {
				return -1;
			}

			var regExObj = new RegExp(keywords, 'i');
			return this.search(regExObj);
		};

		Array.prototype.matchFeature = function(keywords) {
			if(!keywords) {
				return -1;
			}
			var matchIndex = -1;
			this.filter(function(item) {
				if(typeof item === 'string') {
					var matchIdx = item.matchFeature(keywords);
					if (matchIdx >= 0) {
						matchIndex = matchIdx;
					}
				}
			});
			return matchIndex;
		};

		function searchFeatures(keywords) {
			var deferedObj = $q.defer();
			var features = [];
			var servicesPromise = servicesService.getAllServices().then(function(services) {
				services.filter(function(service) {
					if ((service.name && service.name.matchFeature(keywords) >= 0) ||
						(service.title && service.title.matchFeature(keywords) >= 0) ||
						(service.shortDescription && service.shortDescription.matchFeature(keywords) >= 0) ||
						(service.description && service.description.matchFeature(keywords) >= 0) ||
						(service.tags && service.tags.matchFeature(keywords) >= 0)) {
						features.push(service);
					}
				});
			});

			var articlesPromise = articlesService.getAllArticles().then(function(articles) {
				articles.filter(function(article) {
					if ((article.name && article.name.matchFeature(keywords) >= 0) ||
						(article.title && article.title.matchFeature(keywords) >= 0) ||
						(article.shortDescription && article.shortDescription.matchFeature(keywords) >= 0) ||
						(article.description && article.description.matchFeature(keywords) >= 0)) {
						features.push(article);
					}
				});
			});

			$q.all([servicesPromise, articlesPromise]).then(function() {
				deferedObj.resolve(features);
			});

			return deferedObj.promise;
		}

		return {
			searchFeatures: searchFeatures
		};
	};
	searchService.$inject = ['$q', 'servicesService', 'articlesService'];
	module.exports = searchService;
})();
