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
			getTitle: getPageTitle,
			setTitle: setPageTitle
		};
	};

	module.exports = pageTitleService;
})();
