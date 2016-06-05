'use strict';
/*
*	appHeader
*	Description
*	appHeader directive is responsible for loading and painting Application Header
*	from its Html template
*	This may include:
*	Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
*/

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
