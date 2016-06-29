'use strict';
(function() {
	var articleDocument = function() {
		return {
			restrict: 'E',
			scope: {
				article: "=",
				relatedArticles: '='
			},
			templateUrl: 'articles/article.html',
			link: function() {

			}
		};
	};

	articleDocument.$inject = [];
	module.exports = articleDocument;
})();