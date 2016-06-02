'use strict';
(function() {
	var teamHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'team/team-header.html',
			link: function() {

			}
		};
	};

	teamHeader.$inject = [];
	module.exports = teamHeader;
})();
