'use strict';
/**
 * @ngdoc directive
 * @name pfoexp.core:appHeader
 * @element Any
 * @function
 *
 * @description
 * appHeader directive is responsible for loading and painting Application Header
 *	from its Html template
 *	This may include:
 *	Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
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
