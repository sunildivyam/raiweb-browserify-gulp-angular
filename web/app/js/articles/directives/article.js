'use strict';
(function() {
	var article = function() {
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

	article.$inject = [];
	module.exports = article;
})();
