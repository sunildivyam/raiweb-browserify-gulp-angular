'use strict';
/*
*	pageTitleService Service
*	Description
* 	pageTitleService Service Privides Page Titles to the Application
*/
(function() {
	var pageTitleService = function() {
		var pageTitle = '';

		function getPageTitle() {
			return pageTitle;
		}

		function setPageTitle(title) {
			if (typeof title === 'string') {
				pageTitle = title;
			} else {
				pageTitle = '';
			}
		}

		return {
			getPageTitle: getPageTitle,
			setPageTitle: setPageTitle
		};
	};

	module.exports = pageTitleService;
})();
