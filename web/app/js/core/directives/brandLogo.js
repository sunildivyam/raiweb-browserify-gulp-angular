'use strict';
(function() {
	var brandLogo = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				logo: '=',
				size: '@'
			},
			templateUrl: 'core/brand-logo.html',
			link: function($scope) {
				$scope.primaryTitleHtml = '';

				$scope.$watch('logo.primaryTitle', function(newValue, oldValue) {
					if (typeof newValue === 'string' && newValue !== '' && newValue !== oldValue) {
						$scope.primaryTitleHtml = generateTitleWithHighChar(newValue,$scope.logo.highCharIndex);
					}
				});

				function generateTitleWithHighChar(title, highCharIndex) {
					var titleWithHighChar = title;
					if(typeof title === 'string' && title !== '' && title.length >=3 && (highCharIndex > 0 && highCharIndex <= title.length)) {
						titleWithHighChar = [
							'<span>' + title.slice(0, highCharIndex - 1) + '</span>',
							'<span class="high-char">' + title.slice(highCharIndex - 1, highCharIndex) + '</span>',
							'<span>' + title.slice(highCharIndex) + '</span>'
						].join('');
					}
					return titleWithHighChar;
				}
			}
		};
	};

	brandLogo.$inject = [];
	module.exports = brandLogo;
})();
