'use strict';
(function() {
	var contactusHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'contactus/contactus-header.html',
			link: function() {

			}
		};
	};

	contactusHeader.$inject = [];
	module.exports = contactusHeader;
})();
