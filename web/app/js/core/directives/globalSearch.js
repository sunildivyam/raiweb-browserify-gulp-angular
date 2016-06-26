'use strict';
(function() {
	var globalSearch = function($state) {
		return {
			restrict: 'E',
			scope: {
				mode: '@mode'
			},
			templateUrl: 'core/global-search.html',
			link: function($scope, element) {
				$scope.globalSearchKeywords = '';
				var $element = $(element);
				var $searchButton = $element.find('.search-button');
				var $input = $element.find('.global-search-keywords');

				$searchButton.click(function(event) {
					event.preventDefault();
					var keywords = $scope.globalSearchKeywords.trim();
					if ($scope.mode !== 'expanded') {
						$input.toggleClass('open');
					}

					if (keywords) {
						if ($scope.mode !== 'expanded') {
							$scope.globalSearchKeywords = '';
						}

						$state.go('search', {
							keywords: keywords
						});
					}
				});

				$scope.$watch('mode', function(mode) {
					if (mode === 'expanded') {
						$input.addClass('open');
					}
				});
			}
		};
	};

	globalSearch.$inject = ['$state'];
	module.exports = globalSearch;
})();
