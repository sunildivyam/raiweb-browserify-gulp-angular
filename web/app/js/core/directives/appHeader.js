'use strict';
(function() {
	var appHeader = function($rootScope) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				logo: '=',
				navs: '='
			},
			templateUrl: 'core/app-header.html',
			link: function($scope) {
				$scope.logoSize = $rootScope.currentBreakpoint;

				$rootScope.$watch('currentBreakpoint', function(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						$scope.logoSize = newValue;
					}
				});
			}
		};
	};

	appHeader.$inject = ['$rootScope'];
	module.exports = appHeader;
})();
